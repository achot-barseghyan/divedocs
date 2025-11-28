import { jsPDF } from 'jspdf'

export const useExportPDF = () => {
  const exportAllModulesToPDF = async () => {
    // Charger les données directement depuis le fichier JSON
    const response = await fetch('/data/theorie-courses.json')
    if (!response.ok) {
      throw new Error('Impossible de charger les données des cours')
    }

    const coursesData = await response.json()

    if (!coursesData || coursesData.length === 0) {
      throw new Error('Aucun cours trouvé')
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const maxWidth = pageWidth - 2 * margin
    let yPosition = margin

    // Fonction pour nettoyer le texte des caractères spéciaux
    const sanitizeText = (text: string): string => {
      return text
        .replace(/'/g, "'") // Apostrophe typographique -> simple
        .replace(/'/g, "'") // Autre apostrophe typographique
        .replace(/"/g, '"') // Guillemets typographiques ouvrants
        .replace(/"/g, '"') // Guillemets typographiques fermants
        .replace(/°/g, ' deg') // Degré
        .replace(/→/g, '->') // Flèche vers la droite
        .replace(/⇒/g, '=>') // Double flèche
        .replace(/₁/g, '1') // Indice 1
        .replace(/₂/g, '2') // Indice 2
        .replace(/₃/g, '3') // Indice 3
        .replace(/₄/g, '4') // Indice 4
        .replace(/…/g, '...') // Points de suspension
        .replace(/–/g, '-') // Tiret demi-cadratin
        .replace(/—/g, '-') // Tiret cadratin
        .replace(/~/g, '~') // Tilde
        .replace(/≈/g, '~') // Environ/approximativement
    }

    // Fonction pour convertir un ArrayBuffer en Base64
    const toBase64 = (buffer: ArrayBuffer) => {
      let binary = ''
      const bytes = new Uint8Array(buffer)
      const chunk = 0x8000
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(
          null as unknown as number[],
          Array.from(bytes.subarray(i, i + chunk))
        )
      }
      return btoa(binary)
    }

    let activeFontFamily: 'times' | 'NotoSans' = 'times'

    // Fonction pour charger une police
    const tryLoadFont = async (
      url: string,
      vfsName: string,
      family: string,
      style: 'normal' | 'bold' | 'italic' | 'bolditalic'
    ) => {
      try {
        const res = await fetch(url)
        if (!res.ok) {
          console.warn(`Police non trouvée: ${url}`)
          return false
        }
        const ab = await res.arrayBuffer()
        const b64 = toBase64(ab)
        doc.addFileToVFS(vfsName, b64)
        doc.addFont(vfsName, family, style)
        console.log(`Police chargée: ${family} ${style}`)
        return true
      } catch (error) {
        console.warn(`Erreur lors du chargement de ${url}:`, error)
        return false
      }
    }

    // Essayer de charger les polices Noto Sans
    console.log('Tentative de chargement des polices Noto Sans...')
    const hasRegular = await tryLoadFont(
      '/fonts/NotoSans-Regular.ttf',
      'NotoSans-Regular.ttf',
      'NotoSans',
      'normal'
    )
    const hasBold = await tryLoadFont(
      '/fonts/NotoSans-Bold.ttf',
      'NotoSans-Bold.ttf',
      'NotoSans',
      'bold'
    )
    const hasItalic = await tryLoadFont(
      '/fonts/NotoSans-Italic.ttf',
      'NotoSans-Italic.ttf',
      'NotoSans',
      'italic'
    )

    // Utiliser Noto Sans si au moins Regular est chargé
    if (hasRegular) {
      activeFontFamily = 'NotoSans'
      doc.setFont(activeFontFamily, 'normal')
      console.log('✓ Polices Noto Sans chargées avec succès')
    } else {
      console.warn(
        "⚠ Utilisation de la police par défaut (certains caractères peuvent ne pas s'afficher correctement)"
      )
      console.log(
        '💡 Pour corriger : téléchargez Noto Sans et placez les fichiers .ttf dans /public/fonts/'
      )
    }

    // Fonction pour définir la police
    const setFont = (
      style: 'normal' | 'bold' | 'italic' | 'bolditalic',
      size?: number
    ) => {
      if (size) doc.setFontSize(size)
      doc.setFont(activeFontFamily, style)
    }

    // ============= PAGE DE COUVERTURE =============
    doc.setFontSize(24)
    setFont('bold')
    doc.text(sanitizeText('Théorie de Plongée'), pageWidth / 2, 40, {
      align: 'center',
    })

    doc.setFontSize(18)
    doc.text(sanitizeText('Niveau 1 - FFESSM'), pageWidth / 2, 55, {
      align: 'center',
    })

    doc.setFontSize(12)
    setFont('normal')
    doc.text(
      sanitizeText(`Date d'export: ${new Date().toLocaleDateString('fr-FR')}`),
      pageWidth / 2,
      70,
      { align: 'center' }
    )

    // ============= TABLE DES MATIÈRES =============
    doc.addPage()
    yPosition = margin

    doc.setFontSize(18)
    setFont('bold')
    doc.text(sanitizeText('Table des Matières'), margin, yPosition)
    yPosition += 10

    doc.setFontSize(11)
    setFont('normal')
    coursesData.forEach((course: any, index: number) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
      }
      doc.text(
        sanitizeText(`${index + 1}. ${course.title}`),
        margin + 5,
        yPosition
      )
      yPosition += 7
    })

    // ============= CONTENU DES MODULES =============
    for (let i = 0; i < coursesData.length; i++) {
      const course = coursesData[i]

      // Nouvelle page pour chaque module
      doc.addPage()
      yPosition = margin

      // Titre du module
      doc.setFillColor(20, 184, 166) // Teal
      doc.rect(margin, yPosition - 5, maxWidth, 15, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(16)
      setFont('bold')
      doc.text(
        sanitizeText(`Module ${course.id}: ${course.title}`),
        margin + 3,
        yPosition + 5
      )
      yPosition += 20

      // Durée
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      setFont('normal')
      doc.text(sanitizeText(`Durée: ${course.duration}`), margin, yPosition)
      yPosition += 10

      // Description
      doc.setFontSize(11)
      setFont('normal')
      const descLines = doc.splitTextToSize(
        sanitizeText(course.description),
        maxWidth
      )

      for (const line of descLines) {
        if (yPosition > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }
        doc.text(line, margin, yPosition)
        yPosition += 5
      }
      yPosition += 5

      // ============= SECTIONS =============
      if (course.sections && course.sections.length > 0) {
        for (const section of course.sections) {
          // Vérifier si on doit ajouter une nouvelle page
          if (yPosition > pageHeight - 50) {
            doc.addPage()
            yPosition = margin
          }

          // Heading
          if (section.heading) {
            doc.setFontSize(13)
            setFont('bold')
            const headingLines = doc.splitTextToSize(
              sanitizeText(section.heading),
              maxWidth
            )

            for (const line of headingLines) {
              if (yPosition > pageHeight - margin) {
                doc.addPage()
                yPosition = margin
              }
              doc.text(line, margin, yPosition)
              yPosition += 6
            }
            yPosition += 3
          }

          // Contenu
          if (section.content) {
            doc.setFontSize(10)
            setFont('normal')
            const contentLines = doc.splitTextToSize(
              sanitizeText(section.content),
              maxWidth
            )

            for (const line of contentLines) {
              if (yPosition > pageHeight - margin) {
                doc.addPage()
                yPosition = margin
              }
              doc.text(line, margin, yPosition)
              yPosition += 5
            }
            yPosition += 3
          }

          // Liste
          if (section.list && section.list.length > 0) {
            doc.setFontSize(10)
            setFont('normal')

            for (const item of section.list) {
              const itemLines = doc.splitTextToSize(
                sanitizeText(`• ${item}`),
                maxWidth - 5
              )

              for (const line of itemLines) {
                if (yPosition > pageHeight - margin) {
                  doc.addPage()
                  yPosition = margin
                }
                doc.text(line, margin + 5, yPosition)
                yPosition += 5
              }
            }
            yPosition += 3
          }

          // Emphasis
          if (section.emphasis) {
            doc.setFontSize(10)
            setFont('bold')
            const emphasisLines = doc.splitTextToSize(
              sanitizeText(section.emphasis),
              maxWidth
            )

            for (const line of emphasisLines) {
              if (yPosition > pageHeight - margin) {
                doc.addPage()
                yPosition = margin
              }
              doc.text(line, margin, yPosition)
              yPosition += 5
            }
            yPosition += 5
          }

          // Formule
          if (section.formula) {
            if (yPosition > pageHeight - margin) {
              doc.addPage()
              yPosition = margin
            }
            doc.setFillColor(240, 240, 240)
            doc.rect(margin, yPosition - 3, maxWidth, 10, 'F')
            doc.setFontSize(11)
            doc.setFont('courier', 'bold')
            doc.text(
              sanitizeText(section.formula),
              pageWidth / 2,
              yPosition + 3,
              {
                align: 'center',
              }
            )
            yPosition += 12
          }

          // Exemples
          if (section.examples && section.examples.length > 0) {
            doc.setFontSize(10)
            setFont('normal')

            for (const example of section.examples) {
              const exampleLines = doc.splitTextToSize(
                sanitizeText(`• ${example}`),
                maxWidth - 5
              )

              for (const line of exampleLines) {
                if (yPosition > pageHeight - margin) {
                  doc.addPage()
                  yPosition = margin
                }
                doc.text(line, margin + 5, yPosition)
                yPosition += 5
              }
            }
            yPosition += 3
          }

          // Subsections
          if (section.subsections && section.subsections.length > 0) {
            for (const subsection of section.subsections) {
              if (yPosition > pageHeight - 40) {
                doc.addPage()
                yPosition = margin
              }

              if (subsection.title) {
                doc.setFontSize(11)
                setFont('bold')
                doc.text(sanitizeText(subsection.title), margin + 3, yPosition)
                yPosition += 7
              }

              if (subsection.content) {
                doc.setFontSize(10)
                setFont('normal')
                const subContentLines = doc.splitTextToSize(
                  sanitizeText(subsection.content),
                  maxWidth - 6
                )

                for (const line of subContentLines) {
                  if (yPosition > pageHeight - margin) {
                    doc.addPage()
                    yPosition = margin
                  }
                  doc.text(line, margin + 3, yPosition)
                  yPosition += 5
                }
                yPosition += 3
              }

              if (subsection.list && subsection.list.length > 0) {
                doc.setFontSize(10)
                setFont('normal')

                for (const item of subsection.list) {
                  const itemLines = doc.splitTextToSize(
                    sanitizeText(`• ${item}`),
                    maxWidth - 10
                  )

                  for (const line of itemLines) {
                    if (yPosition > pageHeight - margin) {
                      doc.addPage()
                      yPosition = margin
                    }
                    doc.text(line, margin + 8, yPosition)
                    yPosition += 5
                  }
                }
                yPosition += 3
              }

              if (subsection.examples && subsection.examples.length > 0) {
                doc.setFontSize(10)
                setFont('normal')

                for (const example of subsection.examples) {
                  const exampleLines = doc.splitTextToSize(
                    sanitizeText(`• ${example}`),
                    maxWidth - 10
                  )

                  for (const line of exampleLines) {
                    if (yPosition > pageHeight - margin) {
                      doc.addPage()
                      yPosition = margin
                    }
                    doc.text(line, margin + 8, yPosition)
                    yPosition += 5
                  }
                }
                yPosition += 3
              }
            }
          }

          yPosition += 5
        }
      }

      // ============= POINTS CLÉS =============
      if (course.keyPoints && course.keyPoints.length > 0) {
        if (yPosition > pageHeight - 50) {
          doc.addPage()
          yPosition = margin
        }

        doc.setFontSize(13)
        setFont('bold')
        doc.text(sanitizeText('Points Clés à Retenir'), margin, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        setFont('normal')

        for (const point of course.keyPoints) {
          const pointLines = doc.splitTextToSize(
            sanitizeText(`• ${point}`),
            maxWidth - 5
          )

          for (const line of pointLines) {
            if (yPosition > pageHeight - margin) {
              doc.addPage()
              yPosition = margin
            }
            doc.text(line, margin + 5, yPosition)
            yPosition += 5
          }
        }
        yPosition += 3
      }
    }

    // ============= NUMÉROS DE PAGE =============
    const totalPages = doc.internal.pages.length - 1
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(9)
      setFont('normal')
      doc.setTextColor(128, 128, 128)
      doc.text(`Page ${i} / ${totalPages}`, pageWidth / 2, pageHeight - 10, {
        align: 'center',
      })
    }

    // ============= SAUVEGARDE =============
    doc.save(
      `theorie-plongee-niveau1-${new Date().toISOString().split('T')[0]}.pdf`
    )
  }

  return {
    exportAllModulesToPDF,
  }
}
