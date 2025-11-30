import { jsPDF } from 'jspdf'

// Global single-flight guard to prevent concurrent exports
let exportInProgress = false

export const useExportPDF = () => {
  const exportAllModulesToPDF = async () => {
    if (exportInProgress) return
    exportInProgress = true
    try {
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

      // Fonction pour charger et ajouter une image au PDF
      const addImageToPDF = async (imageSrc: string, maxImgWidth: number) => {
        try {
          const img = new Image()
          img.crossOrigin = 'anonymous'

          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
            img.src = imageSrc
          })

          const imgWidth = img.width
          const imgHeight = img.height
          const ratio = imgWidth / imgHeight

          let finalWidth = maxImgWidth
          let finalHeight = finalWidth / ratio

          // Si l'image est trop haute, ajuster
          const maxImgHeight = pageHeight - margin * 2 - 20
          if (finalHeight > maxImgHeight) {
            finalHeight = maxImgHeight
            finalWidth = finalHeight * ratio
          }

          // Vérifier s'il faut ajouter une nouvelle page
          if (yPosition + finalHeight > pageHeight - margin) {
            doc.addPage()
            yPosition = margin
          }

          // Créer un canvas pour l'image
          const canvas = document.createElement('canvas')
          canvas.width = imgWidth
          canvas.height = imgHeight
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            const imageData = canvas.toDataURL('image/jpeg', 0.8)

            doc.addImage(
              imageData,
              'JPEG',
              margin,
              yPosition,
              finalWidth,
              finalHeight
            )
            yPosition += finalHeight + 5
          }
        } catch (error) {
          console.warn(`Impossible de charger l'image: ${imageSrc}`, error)
        }
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
        sanitizeText(
          `Date d'export: ${new Date().toLocaleDateString('fr-FR')}`
        ),
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

        // (Durée retirée)
        // Reset text color to black for normal content
        doc.setTextColor(0, 0, 0)

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
                  doc.text(
                    sanitizeText(subsection.title),
                    margin + 3,
                    yPosition
                  )
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

                // Images des subsections
                if (subsection.images && subsection.images.length > 0) {
                  for (const image of subsection.images) {
                    await addImageToPDF(image.src, maxWidth - 6)
                  }
                }
              }
            }

            // Images des sections
            if (section.images && section.images.length > 0) {
              for (const image of section.images) {
                await addImageToPDF(image.src, maxWidth)
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
    } finally {
      exportInProgress = false
    }
  }

  return {
    exportAllModulesToPDF,
    exportModuleToPDF: async (moduleId: number) => {
      if (exportInProgress) return
      exportInProgress = true
      try {
        // Charger les données directement depuis le fichier JSON
        const response = await fetch('/data/theorie-courses.json')
        if (!response.ok) {
          throw new Error('Impossible de charger les données des cours')
        }

        const coursesData = await response.json()
        const course = coursesData.find((c: any) => c.id === moduleId)
        if (!course) throw new Error('Module introuvable')

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

        const sanitizeText = (text: string): string =>
          String(text ?? '')
            .replace(/'/g, "'")
            .replace(/"/g, '"')
            .replace(/°/g, ' deg')
            .replace(/→/g, '->')
            .replace(/⇒/g, '=>')
            .replace(/…/g, '...')
            .replace(/[–—]/g, '-')

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
        const tryLoadFont = async (
          url: string,
          vfsName: string,
          family: string,
          style: 'normal' | 'bold' | 'italic' | 'bolditalic'
        ) => {
          try {
            const res = await fetch(url)
            if (!res.ok) return false
            const ab = await res.arrayBuffer()
            const b64 = toBase64(ab)
            doc.addFileToVFS(vfsName, b64)
            doc.addFont(vfsName, family, style)
            return true
          } catch {
            return false
          }
        }

        const hasRegular = await tryLoadFont(
          '/fonts/NotoSans-Regular.ttf',
          'NotoSans-Regular.ttf',
          'NotoSans',
          'normal'
        )
        await tryLoadFont(
          '/fonts/NotoSans-Bold.ttf',
          'NotoSans-Bold.ttf',
          'NotoSans',
          'bold'
        )
        await tryLoadFont(
          '/fonts/NotoSans-Italic.ttf',
          'NotoSans-Italic.ttf',
          'NotoSans',
          'italic'
        )
        if (hasRegular) doc.setFont((activeFontFamily = 'NotoSans'), 'normal')

        const setFont = (
          style: 'normal' | 'bold' | 'italic' | 'bolditalic',
          size?: number
        ) => {
          if (size) doc.setFontSize(size)
          doc.setFont(activeFontFamily, style)
        }

        // Fonction pour charger et ajouter une image au PDF
        const addImageToPDF = async (imageSrc: string, maxImgWidth: number) => {
          try {
            const img = new Image()
            img.crossOrigin = 'anonymous'

            await new Promise((resolve, reject) => {
              img.onload = resolve
              img.onerror = reject
              img.src = imageSrc
            })

            const imgWidth = img.width
            const imgHeight = img.height
            const ratio = imgWidth / imgHeight

            let finalWidth = maxImgWidth
            let finalHeight = finalWidth / ratio

            const maxImgHeight = pageHeight - margin * 2 - 20
            if (finalHeight > maxImgHeight) {
              finalHeight = maxImgHeight
              finalWidth = finalHeight * ratio
            }

            if (yPosition + finalHeight > pageHeight - margin) {
              doc.addPage()
              yPosition = margin
            }

            const canvas = document.createElement('canvas')
            canvas.width = imgWidth
            canvas.height = imgHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0)
              const imageData = canvas.toDataURL('image/jpeg', 0.8)

              doc.addImage(
                imageData,
                'JPEG',
                margin,
                yPosition,
                finalWidth,
                finalHeight
              )
              yPosition += finalHeight + 5
            }
          } catch (error) {
            console.warn(`Impossible de charger l'image: ${imageSrc}`, error)
          }
        }

        // Couverture simple pour le module
        setFont('bold', 20)
        doc.text(sanitizeText(course.title), pageWidth / 2, 40, {
          align: 'center',
        })
        // (Durée retirée de la couverture du module)
        if (course.description) {
          setFont('normal', 11)
          const lines = doc.splitTextToSize(
            sanitizeText(course.description),
            maxWidth
          )
          let yy = 70
          for (const line of lines) {
            doc.text(line, margin, yy)
            yy += 5
          }
        }

        // Contenu complet du module (même rendu que All)
        const renderSectionText = (
          lines: string[] | string,
          x: number,
          indent = 0,
          lineStep = 5
        ) => {
          const arr = Array.isArray(lines) ? lines : [lines]
          for (const line of arr) {
            if (yPosition > pageHeight - margin) {
              doc.addPage()
              yPosition = margin
            }
            doc.text(line, x + indent, yPosition)
            yPosition += lineStep
          }
        }

        doc.addPage()
        yPosition = margin

        // Titre bandeau
        doc.setFillColor(20, 184, 166)
        doc.rect(margin, yPosition - 5, maxWidth, 15, 'F')
        doc.setTextColor(255, 255, 255)
        setFont('bold', 16)
        doc.text(
          sanitizeText(`Module ${course.id}: ${course.title}`),
          margin + 3,
          yPosition + 5
        )
        yPosition += 20
        doc.setTextColor(0, 0, 0)

        // Sections
        if (course.sections?.length) {
          for (const section of course.sections) {
            if (section.heading) {
              setFont('bold', 13)
              const h = doc.splitTextToSize(
                sanitizeText(section.heading),
                maxWidth
              )
              renderSectionText(h, margin, 0, 6)
              yPosition += 3
            }
            if (section.content) {
              setFont('normal', 10)
              const c = doc.splitTextToSize(
                sanitizeText(section.content),
                maxWidth
              )
              renderSectionText(c, margin)
              yPosition += 3
            }
            if (section.list?.length) {
              setFont('normal', 10)
              for (const it of section.list) {
                const l = doc.splitTextToSize(
                  sanitizeText(`• ${it}`),
                  maxWidth - 5
                )
                renderSectionText(l, margin, 5)
              }
              yPosition += 3
            }
            if (section.emphasis) {
              setFont('bold', 10)
              const e = doc.splitTextToSize(
                sanitizeText(section.emphasis),
                maxWidth
              )
              renderSectionText(e, margin)
              yPosition += 5
            }
            if (section.formula) {
              if (yPosition > pageHeight - margin) {
                doc.addPage()
                yPosition = margin
              }
              doc.setFillColor(240, 240, 240)
              doc.rect(margin, yPosition - 3, maxWidth, 10, 'F')
              setFont('bold', 11)
              doc.setFont('courier', 'bold')
              doc.text(
                sanitizeText(section.formula),
                pageWidth / 2,
                yPosition + 3,
                { align: 'center' }
              )
              yPosition += 12
              setFont('normal', 10)
            }
            if (section.examples?.length) {
              setFont('normal', 10)
              for (const ex of section.examples) {
                const l = doc.splitTextToSize(
                  sanitizeText(`• ${ex}`),
                  maxWidth - 5
                )
                renderSectionText(l, margin, 5)
              }
              yPosition += 3
            }
            if (section.subsections?.length) {
              for (const sub of section.subsections) {
                if (sub.title) {
                  setFont('bold', 11)
                  renderSectionText(sanitizeText(sub.title), margin + 3)
                }
                if (sub.content) {
                  setFont('normal', 10)
                  const l = doc.splitTextToSize(
                    sanitizeText(sub.content),
                    maxWidth - 6
                  )
                  renderSectionText(l, margin + 3)
                  yPosition += 3
                }
                if (sub.list?.length) {
                  setFont('normal', 10)
                  for (const it of sub.list) {
                    const l = doc.splitTextToSize(
                      sanitizeText(`• ${it}`),
                      maxWidth - 10
                    )
                    renderSectionText(l, margin + 8)
                  }
                  yPosition += 3
                }
                if (sub.examples?.length) {
                  setFont('normal', 10)
                  for (const ex of sub.examples) {
                    const l = doc.splitTextToSize(
                      sanitizeText(`• ${ex}`),
                      maxWidth - 10
                    )
                    renderSectionText(l, margin + 8)
                  }
                  yPosition += 3
                }
                if (sub.images?.length) {
                  for (const image of sub.images) {
                    await addImageToPDF(image.src, maxWidth - 6)
                  }
                }
              }
            }
            if (section.images?.length) {
              for (const image of section.images) {
                await addImageToPDF(image.src, maxWidth)
              }
            }
            yPosition += 5
          }
        }

        // Points clés
        if (course.keyPoints?.length) {
          if (yPosition > pageHeight - 50) {
            doc.addPage()
            yPosition = margin
          }
          setFont('bold', 13)
          doc.text('Points Clés à Retenir', margin, yPosition)
          yPosition += 8
          setFont('normal', 10)
          for (const p of course.keyPoints) {
            const l = doc.splitTextToSize(sanitizeText(`• ${p}`), maxWidth - 5)
            renderSectionText(l, margin, 5)
          }
          yPosition += 3
        }

        // Numéros de page
        const totalPages = doc.internal.pages.length - 1
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i)
          doc.setFontSize(9)
          setFont('normal')
          doc.setTextColor(128, 128, 128)
          doc.text(
            `Page ${i} / ${totalPages}`,
            pageWidth / 2,
            pageHeight - 10,
            {
              align: 'center',
            }
          )
        }

        // Sauvegarde (une seule fois)
        const slug = (s: string) =>
          sanitizeText(s)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        doc.save(
          `module-${course.id}-${slug(course.title)}-${new Date().toISOString().split('T')[0]}.pdf`
        )
      } finally {
        exportInProgress = false
      }
    },
  }
}
