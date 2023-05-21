const ALPHA = "abcdefghijklmnopqrstuvwxyz";

      function encryptMonoalphaSub(message, key) {
        let encrypted = "";
        for (let i = 0; i < message.length; i++) {
          let char = message[i];
          let index = ALPHA.indexOf(char.toLowerCase());
          if (index !== -1) {
            let shiftedIndex = (index + key) % ALPHA.length;
            let encryptedChar = ALPHA[shiftedIndex];
            encrypted += char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
          } else {
            encrypted += char;
          }
        }
        return encrypted;
      }

      function decryptMonoalphaSub(message, key) {
        let decrypted = "";
        for (let i = 0; i < message.length; i++) {
          let char = message[i];
          let index = ALPHA.indexOf(char.toLowerCase());
          if (index !== -1) {

            let shiftedIndex = (index - key + ALPHA.length) % ALPHA.length;
            let decryptedChar = ALPHA[shiftedIndex];
            decrypted += char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
          } else {
            decrypted += char;
          }
        }
        return decrypted;
      }

      const cryptoForm = document.getElementById("crypto-form");
      const resultLabel = document.getElementById("result-label");
      const result = document.getElementById("result");

      cryptoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const message = event.target.elements.message.value;
        const key = Number(event.target.elements.key.value);
        const operation = event.target.elements.operation.value;

        let output = "";
        if (operation === "encrypt") {
          output = encryptMonoalphaSub(message, key);
          resultLabel.innerText = "Encrypted message:";
        } else if (operation === "decrypt") {
          output = decryptMonoalphaSub(message, key);
          resultLabel.innerText = "Decrypted message:";
        }

        result.innerText = output;
      });

      // Function to decode the file content using a Caesar cipher
      function decode(content, key) {
        let decoded = "";
        for (let i = 0; i < content.length; i++) {
          const char = content[i];
          if (char.match(/[a-z]/i)) {
            const charCode = content.charCodeAt(i);
            let decodedCharCode;
            if (char === char.toUpperCase()) {
              decodedCharCode = ((charCode - 65 - key + 26) % 26) + 65;
            } else {
              decodedCharCode = ((charCode - 97 - key + 26) % 26) + 97;
            }
            decoded += String.fromCharCode(decodedCharCode);
          } else {
            decoded += char;
          }
        }
        return decoded;
      }

      // Function to decode the file content
      function decodeFile(file, key) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const encodedContent = reader.result;
            const decodedContent = decode(encodedContent, key);
            resolve(decodedContent);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
          reader.readAsText(file);
        });
      }

      // Function to download the decoded content as a file
      function downloadDecodedFile(content) {
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "decoded_file.txt";
        link.click();
      }

      // Event listener for the decode button
      const decodeButton = document.getElementById("decode-button");
      decodeButton.addEventListener("click", async () => {
        const fileInput = document.getElementById("file-input");
        const file = fileInput.files[0];
        const keyInput = document.getElementById("key-input");
        const key = Number(keyInput.value);
        if (file) {
          try {
            const decodedContent = await decodeFile(file, key);
            downloadDecodedFile(decodedContent);
          } catch (error) {
            console.error("Error decoding file:", error);
          }
        }
      });

      // Function to encode the file content using a Caesar cipher
      function encode(content, key) {
        let encoded = "";
        for (let i = 0; i < content.length; i++) {
          const char = content[i];
          if (char.match(/[a-z]/i)) {
            const charCode = content.charCodeAt(i);
            let encodedCharCode;
            if (char === char.toUpperCase()) {
              encodedCharCode = ((charCode - 65 + key) % 26) + 65;
            } else {
              encodedCharCode = ((charCode - 97 + key) % 26) + 97;
            }
            encoded += String.fromCharCode(encodedCharCode);
          } else {
            encoded += char;
          }
        }
        return encoded;
      }

      // Function to encode the file content
      function encodeFile(file, key) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const content = reader.result;
            const encodedContent = encode(content, key);
            resolve(encodedContent);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
          reader.readAsText(file);
        });
      }

      // Function to download the encoded content as a file
      function downloadEncodedFile(content) {
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "encoded_file.txt";
        link.click();
      }

      // Event listener for the encode button
      const encodeButton = document.getElementById("encode-button");
      encodeButton.addEventListener("click", async () => {
        const fileInput = document.getElementById("file-input");
        const file = fileInput.files[0];
        const keyInput = document.getElementById("key-input");
        const key = Number(keyInput.value);
        if (file) {
          try {
            const encodedContent = await encodeFile(file, key);
            downloadEncodedFile(encodedContent);
          } catch (error) {
            console.error("Error encoding file:", error);
          }
        }
      });