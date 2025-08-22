function convertPDF() {
      const fileInput = document.getElementById("pdfInput");
      const progress = document.getElementById("progress");
      const progressBar = document.getElementById("progressBar");
      const status = document.getElementById("status");

      if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
      }

      progress.style.display = "block";
      status.textContent = "Converting...";

      let width = 0;
      const interval = setInterval(() => {
        if (width >= 100) {
          clearInterval(interval);
          const file = fileInput.files[0];
          const blob = file.slice(0, file.size, "application/pdf");
          const newFile = new File([blob], file.name.replace(".pdf", "_converted.pdf"), {type: "application/pdf"});
          const url = URL.createObjectURL(newFile);

          const a = document.createElement("a");
          a.href = url;
          a.download = newFile.name;
          a.click();
          status.textContent = "Conversion complete! Same PDF, new name 🎉";
        } else {
          width += 20;
          progressBar.style.width = width + "%";
        }
      }, 500);
    }