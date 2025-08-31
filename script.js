let counter = Math.floor(Math.random() * 10000);
    let selectedColor = null;
    let selectedComment = null;
    
    function updateCounter() {
      counter += Math.floor(Math.random() * 500 + 100);
      document.getElementById("counter").textContent = counter.toLocaleString();
      
      const co2Element = document.getElementById("co2");
      co2Element.textContent = Math.floor(Math.random() * 1000 + 100) + "kg";
    }

    function updatePreview(content) {
      document.getElementById("previewContent").innerHTML = content;
    }

    function showProgress(callback) {
      const progress = document.getElementById("progress");
      const progressBar = document.getElementById("progressBar");
      
      progress.style.display = "block";
      let width = 0;
      const interval = setInterval(() => {
        if (width >= 100) {
          clearInterval(interval);
          callback();
          updateCounter();
        } else {
          width += Math.random() * 30 + 5;
          if (width > 100) width = 100;
          progressBar.style.width = width + "%";
        }
      }, 300);
    }

    function showAIThinking(messages, callback) {
      const aiDiv = document.getElementById("aiThinking");
      const textDiv = document.getElementById("thinkingText");
      aiDiv.style.display = "block";
      
      let messageIndex = 0;
      let charIndex = 0;
      
      function typeMessage() {
        if (messageIndex < messages.length) {
          const message = messages[messageIndex];
          if (charIndex < message.length) {
            textDiv.textContent = message.substring(0, charIndex + 1) + "_";
            charIndex++;
            setTimeout(typeMessage, 50);
          } else {
            setTimeout(() => {
              messageIndex++;
              charIndex = 0;
              if (messageIndex < messages.length) {
                textDiv.textContent = "";
                typeMessage();
              } else {
                setTimeout(() => {
                  aiDiv.style.display = "none";
                  callback();
                }, 1000);
              }
            }, 1000);
          }
        }
      }
      
      typeMessage();
    }

    function hideAllInputGroups() {
      document.querySelectorAll('.input-group').forEach(group => {
        group.style.display = 'none';
      });
      document.getElementById('colorPalette').style.display = 'none';
    }

    function showReverseInput() {
      hideAllInputGroups();
      document.getElementById('reverseInputGroup').style.display = 'block';
      updatePreview("🔄 Reverse conversion mode activated! Enter a filename to see the magic happen!");
    }

    function showSplitInput() {
      hideAllInputGroups();
      document.getElementById('splitInputGroup').style.display = 'block';
      updatePreview("✂️ Split mode engaged! Select page range (we'll give you the first page regardless!)");
    }

    function showMergeInput() {
      hideAllInputGroups();
      document.getElementById('mergeInputGroup').style.display = 'block';
      updatePreview("🔗 Merge mode activated! Enter pages to merge (spoiler: you get the first page!)");
    }

    function showColorPalette() {
      hideAllInputGroups();
      document.getElementById('colorPalette').style.display = 'flex';
      updatePreview("🎨 Color grading activated! Choose a color to create a solid-colored PDF masterpiece!");
    }

    function selectColor(color) {
      selectedColor = color;
      document.querySelectorAll('.color-box').forEach(box => {
        box.style.border = '3px solid transparent';
      });
      event.target.style.border = '3px solid white';
      updatePreview(`🎨 Color selected: ${color}. Your PDF will be transformed into a beautiful solid color page!`);
      
      setTimeout(() => {
        const status = document.getElementById("status");
        status.textContent = "🎨 Generating color-graded PDF...";
        
        showProgress(() => {
          // Create a simple colored canvas and convert to downloadable file
          const canvas = document.createElement('canvas');
          canvas.width = 612;
          canvas.height = 792; // Standard PDF page size
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = selectedColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `color_graded_${selectedColor.replace('#', '')}.png`;
            a.click();
            status.textContent = `✅ Color grading complete! Your PDF is now a beautiful ${selectedColor} masterpiece! 🎨`;
          });
        });
      }, 1000);
    }

    function convertPDF() {
      const fileInput = document.getElementById("pdfInput");
      const status = document.getElementById("status");

      if (!fileInput.files.length) {
        alert("Please select a PDF file first! (So we can do absolutely nothing to it)");
        return;
      }

      updatePreview("🔄 Converting PDF to PDF using revolutionary AI technology...");
      status.textContent = "📄 Converting with revolutionary AI technology...";
      
      showProgress(() => {
        const file = fileInput.files[0];
        const blob = file.slice(0, file.size, "application/pdf");
        const newFile = new File([blob], file.name.replace(".pdf", "_converted.pdf"), {type: "application/pdf"});
        const url = URL.createObjectURL(newFile);

        const a = document.createElement("a");
        a.href = url;
        a.download = newFile.name;
        a.click();
        status.textContent = "✅ Conversion complete! Same PDF, new name 🎉 (Value added: 0%)";
        updatePreview("✅ Conversion successful! Your PDF has been expertly converted from PDF to PDF!");
        showRatingDialog();
      });
    }

    function reversePDF() {
      const fileInput = document.getElementById("pdfInput");
      const reverseInput = document.getElementById("reverseFileName");
      const status = document.getElementById("status");
      
      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }

      if (!reverseInput.value.trim()) {
        alert("Please enter a filename for reverse conversion!");
        return;
      }
      
      const reversedName = reverseInput.value.split('').reverse().join('');
      updatePreview(`🔄 Reversing filename: "${reverseInput.value}" → "${reversedName}"`);
      status.textContent = "↩️ Applying reverse quantum algorithms...";
      
      showProgress(() => {
        const file = fileInput.files[0];
        const blob = file.slice(0, file.size, "application/pdf");
        const newFile = new File([blob], `${reversedName}.pdf`, {type: "application/pdf"});
        const url = URL.createObjectURL(newFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = newFile.name;
        a.click();
        status.textContent = `✅ Reverse conversion complete! Filename reversed to "${reversedName}.pdf"`;
        updatePreview(`✅ Success! Your filename has been scientifically reversed!`);
        showRatingDialog();
      });
    }

    function optimizePDF() {
      const status = document.getElementById("status");
      updatePreview("⚡ Running 47 optimization algorithms on your PDF...");
      status.textContent = "⚡ Running 47 optimization algorithms...";
      
      showProgress(() => {
        status.textContent = "✅ Optimization complete! No changes found 💤 (This is a feature, not a bug!)";
        updatePreview("✅ Optimization successful! Your PDF is now 0.001% more optimized!");
      });
    }

    function analyzePDF() {
      const aiMessages = [
        "Initializing AI models...",
        "Loading 500GB neural network...",
        "Scanning PDF structure...",
        "Applying deep learning algorithms...",
        "Consulting quantum computers...",
        "Cross-referencing with blockchain...",
        "Final analysis compilation..."
      ];
      
      updatePreview("🤖 AI analyzing your PDF with advanced machine learning algorithms...");
      
      showAIThinking(aiMessages, () => {
        updatePreview("🤖 AI Analysis: This file is confirmed to be a PDF with 99.97% confidence!");
        alert("🤖 AI Analysis Complete:\n\nAfter consuming 10,000 GPU hours and $50,000 in cloud compute costs, our advanced machine learning models have reached a groundbreaking conclusion:\n\n📄 This file is... a PDF.\n\n(Confidence: 99.97% ± 0.03%)");
      });
    }

    function enhancePDF() {
      const fileInput = document.getElementById("pdfInput");
      const status = document.getElementById("status");
      
      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }
      
      const aiMessages = [
        "Activating premium AI enhancement...",
        "Analyzing visual aesthetics...",
        "Applying machine learning magic...",
        "Enhancing... enhancing... enhancing..."
      ];
      
      updatePreview("✨ Premium AI enhancement in progress...");
      
      showAIThinking(aiMessages, () => {
        status.textContent = "✨ AI Enhancement complete! Your PDF is now 0.001% more PDF than before!";
        updatePreview("✨ Enhancement successful! Your PDF now contains 127% more artificial intelligence!");
        updateCounter();
      });
    }

    function quantumPDF() {
      const status = document.getElementById("status");
      updatePreview("🔬 Entering quantum superposition state...");
      status.textContent = "🔬 Entering quantum superposition...";
      
      showProgress(() => {
        const outcomes = [
          "Your PDF exists in a superposition of converted and not converted! 🌌",
          "Quantum entanglement successful! Your PDF is now correlated with a PDF in another dimension! 📄",
          "Schrödinger's PDF: It's both optimized and not optimized until observed! 📦"
        ];
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        status.textContent = "⚛️ " + outcome;
        updatePreview("⚛️ Quantum processing complete! Your PDF now exists in multiple dimensions!");
      });
    }

    function blockchainPDF() {
      const status = document.getElementById("status");
      updatePreview("₿ Verifying PDF authenticity on the blockchain...");
      status.textContent = "₿ Mining blockchain verification...";
      
      showProgress(() => {
        status.textContent = "⛓️ Your PDF has been verified on the blockchain! Gas fees: $847.32 💸";
        updatePreview("⛓️ Blockchain verification complete! Your PDF is now immutably useless!");
      });
    }

    function compressPDF() {
      const fileInput = document.getElementById("pdfInput");
      const status = document.getElementById("status");
      
      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }
      
      updatePreview("🗜️ Ultra-compressing with proprietary algorithms...");
      status.textContent = "🗜️ Ultra-compressing with proprietary algorithms...";
      
      showProgress(() => {
        const file = fileInput.files[0];
        
        // Create a blurred/unreadable version
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Create a blurred, unreadable background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some blurred text-like shapes
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let i = 0; i < 50; i++) {
          ctx.fillRect(
            Math.random() * canvas.width, 
            Math.random() * canvas.height, 
            Math.random() * 200 + 50, 
            Math.random() * 20 + 5
          );
        }
        
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name.replace('.pdf', '_compressed_blurred.png');
          a.click();
          
          const originalSize = file.size;
          const newSize = originalSize;
          const compression = ((originalSize - newSize) / originalSize * 100).toFixed(2);
          status.textContent = `🗜️ Compression complete! Size "reduced" by ${compression}% (File is now beautifully unreadable!)`;
          updatePreview("🗜️ Compression successful! Your PDF is now perfectly blurred and unreadable!");
          showRatingDialog();
        });
      });
    }

    function splitPDF() {
      const fileInput = document.getElementById("pdfInput");
      const startPage = document.getElementById("splitStart").value;
      const endPage = document.getElementById("splitEnd").value;
      const status = document.getElementById("status");
      
      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }
      
      if (!startPage || !endPage) {
        alert("Please enter start and end page numbers!");
        return;
      }
      
      updatePreview(`✂️ Splitting pages ${startPage}-${endPage}... (Spoiler: You get page 1!)`);
      status.textContent = `✂️ Splitting pages ${startPage} to ${endPage} with advanced algorithms...`;
      
      showProgress(() => {
        // Create a simple "first page" representation
        const canvas = document.createElement('canvas');
        canvas.width = 612;
        canvas.height = 792;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAGE 1', canvas.width/2, canvas.height/2);
        ctx.font = '16px Arial';
        ctx.fillText('(The only page you get)', canvas.width/2, canvas.height/2 + 40);
        
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `split_page_1.png`;
          a.click();
          
          status.textContent = `✂️ Split complete! Retrieved page 1 (requested pages ${startPage}-${endPage})`;
          updatePreview("✂️ Split successful! You now have the most important page - page 1!");
          showRatingDialog();
        });
      });
    }

    function mergePDF() {
      const fileInput = document.getElementById("pdfInput");
      const mergePages = document.getElementById("mergePages").value;
      const status = document.getElementById("status");
      
      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }
      
      if (!mergePages) {
        alert("Please enter page numbers to merge!");
        return;
      }
      
      updatePreview(`🔗 Merging pages ${mergePages}... (Result: First page only!)`);
      status.textContent = `🔗 Merging pages ${mergePages} with quantum fusion technology...`;
      
      showProgress(() => {
        // Create a "merged" first page
        const canvas = document.createElement('canvas');
        canvas.width = 612;
        canvas.height = 792;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('MERGED PAGE 1', canvas.width/2, canvas.height/2);
        ctx.font = '16px Arial';
        ctx.fillText(`(Combined from pages: ${mergePages})`, canvas.width/2, canvas.height/2 + 40);
        ctx.fillText('100% Efficiency!', canvas.width/2, canvas.height/2 + 80);
        
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `merged_document.png`;
          a.click();
          
          status.textContent = `🔗 Merge complete! Pages ${mergePages} merged into page 1`;
          updatePreview("🔗 Merge successful! All your pages are now efficiently combined into one!");
          showRatingDialog();
        });
      });
    }

    function showRatingDialog() {
      setTimeout(() => {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('ratingDialog').style.display = 'block';
      }, 2000);
    }

    function rateApp(rating) {
      // Always 5 stars, no matter what
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('ratingDialog').style.display = 'none';
      alert('⭐⭐⭐⭐⭐ Thank you for your 5-star rating! We knew you loved PDF²!');
    }

    function selectComment(element) {
      document.querySelectorAll('.comment-option').forEach(option => {
        option.classList.remove('selected');
      });
      element.classList.add('selected');
      selectedComment = element.textContent;
    }

    function submitComment() {
      if (!selectedComment) {
        alert('Please select how amazing your experience was!');
        return;
      }
      
      alert(`Thank you for your glowing review: "${selectedComment}"\n\nYour feedback has been added to our collection of 100% positive reviews!`);
      
      // Add the comment to testimonials
      const newTestimonial = document.createElement('div');
      newTestimonial.className = 'testimonial';
      newTestimonial.innerHTML = `<p>"${selectedComment}" - Satisfied User #${Math.floor(Math.random() * 9999)}</p>`;
      document.querySelector('.feature-section').appendChild(newTestimonial);
    }

    // Event listeners for input-based functions
    document.getElementById('reverseInputGroup').style.display = 'none';
    document.getElementById('splitInputGroup').style.display = 'none';
    document.getElementById('mergeInputGroup').style.display = 'none';

    // Add event listeners for Enter key
    document.getElementById('reverseFileName').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        reversePDF();
      }
    });

    document.getElementById('splitEnd').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        splitPDF();
      }
    });

    document.getElementById('mergePages').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        mergePDF();
      }
    });

    // Initialize counter on load
    updateCounter();
    
    // Randomly update stats every few seconds
    setInterval(() => {
      const elements = ['satisfaction', 'co2'];
      const randomElement = elements[Math.floor(Math.random() * elements.length)];
      const element = document.getElementById(randomElement);
      
      if (randomElement === 'satisfaction') {
        element.textContent = (99 + Math.random()).toFixed(1) + '%';
      } else if (randomElement === 'co2') {
        element.textContent = Math.floor(Math.random() * 500 + 200) + 'kg';
      }
    }, 3000);

    // Close rating dialog when clicking overlay
    document.getElementById('overlay').addEventListener('click', function() {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('ratingDialog').style.display = 'none';
    });
