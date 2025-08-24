let counter = Math.floor(Math.random() * 10000);
    
    function updateCounter() {
      counter += Math.floor(Math.random() * 500 + 100);
      document.getElementById("counter").textContent = counter.toLocaleString();
      
      // Update other "stats"
      const co2Element = document.getElementById("co2");
      co2Element.textContent = Math.floor(Math.random() * 1000 + 100) + "kg";
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
          width += Math.random() * 30 + 5; // Irregular progress
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

    function convertPDF() {
      const fileInput = document.getElementById("pdfInput");
      const status = document.getElementById("status");

      if (!fileInput.files.length) {
        alert("Please select a PDF file first! (So we can do absolutely nothing to it)");
        return;
      }

      status.textContent = "🔄 Converting with revolutionary AI technology...";
      
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
      });
    }

    function reversePDF() {
      const fileInput = document.getElementById("pdfInput");
      const status = document.getElementById("status");
      
      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }
      
      status.textContent = "↩️ Applying reverse quantum algorithms...";
      
      showProgress(() => {
        const file = fileInput.files[0];
        const blob = file.slice(0, file.size, "application/pdf");
        const newFile = new File([blob], file.name.replace(".pdf", "_reversed.pdf"), {type: "application/pdf"});
        const url = URL.createObjectURL(newFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = newFile.name;
        a.click();
        status.textContent = "✅ Reverse conversion complete! (File unchanged 🙃) Success rate: 100%";
      });
    }

    function optimizePDF() {
      const status = document.getElementById("status");
      status.textContent = "⚡ Running 47 optimization algorithms...";
      
      showProgress(() => {
        status.textContent = "✅ Optimization complete! No changes found 💤 (This is a feature, not a bug!)";
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
      
      showAIThinking(aiMessages, () => {
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
      
      showAIThinking(aiMessages, () => {
        status.textContent = "✨ AI Enhancement complete! Your PDF is now 0.001% more PDF than before!";
        updateCounter();
      });
    }

    function quantumPDF() {
      const status = document.getElementById("status");
      status.textContent = "🔬 Entering quantum superposition...";
      
      showProgress(() => {
        const outcomes = [
          "Your PDF exists in a superposition of converted and not converted! 🌌",
          "Quantum entanglement successful! Your PDF is now correlated with a PDF in another dimension! 🔄",
          "Schrödinger's PDF: It's both optimized and not optimized until observed! 📦"
        ];
        status.textContent = "⚛️ " + outcomes[Math.floor(Math.random() * outcomes.length)];
      });
    }

    function blockchainPDF() {
      const status = document.getElementById("status");
      status.textContent = "₿ Mining blockchain verification...";
      
      showProgress(() => {
        status.textContent = "⛓️ Your PDF has been verified on the blockchain! Gas fees: $847.32 💸";
      });
    }

    function compressPDF() {
      const fileInput = document.getElementById("pdfInput");
      const status = document.getElementById("status");
      
      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }
      
      status.textContent = "🗜️ Ultra-compressing with proprietary algorithms...";
      
      showProgress(() => {
        const originalSize = fileInput.files[0].size;
        const newSize = originalSize; // Same size, obviously
        const compression = ((originalSize - newSize) / originalSize * 100).toFixed(2);
        status.textContent = `🗜️ Compression complete! Size reduced by ${compression}% (${originalSize} → ${newSize} bytes)`;
      });
    }

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