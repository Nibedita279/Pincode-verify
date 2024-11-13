document.addEventListener('DOMContentLoaded', () => {
  const pinInputs = document.querySelectorAll('#pin1, #pin2, #pin3, #pin4, #pin5, #pin6');
  const confirmPinInputs = document.querySelectorAll('#confirm1, #confirm2, #confirm3, #confirm4, #confirm5, #confirm6');

 
  pinInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value) {
        confirmPinInputs[index].value = e.target.value;
        if (index < pinInputs.length - 1) {
          pinInputs[index + 1].focus();
        }
      }
    });
  });

  function getPinCode(inputs) {
    return Array.from(inputs).map(input => input.value).join('');
  }
  function checkPinMatch() {
      const pin = getPinCode(document.querySelectorAll('#pin1, #pin2, #pin3, #pin4, #pin5, #pin6'));
      const confirmPin = getPinCode(document.querySelectorAll('#confirm1, #confirm2, #confirm3, #confirm4, #confirm5, #confirm6'));
      return pin === confirmPin;
    }
    if (checkPinMatch()) {
      document.getElementById('status-message').style.display = 'block';
      }
      else{
          document.getElementById('errorMsg').style.display = 'block'; 
      }
      function isPinComplete(inputs) {
        return getPinCode(inputs).length === 6;
      }
      
    
      document.getElementById('continueBtn').addEventListener('click', async () => {
        if (!isPinComplete(pinInputs)) {
          alert('Please complete the 6-digit PIN.');
          return;
        }
        if (!checkPinMatch()) {
          alert('Pin codes are not Matched');
          return;
          }
          
    
        const pin = getPinCode(pinInputs);
        const url = `https://api.postalpincode.in/pincode/${pin}`;
    
        try {
          const response = await fetch(url);
    
          const data = await response.json();
          console.log(data)
          document.getElementById('container').style.display = 'none';
          document.getElementById('response-box').style.display = 'block';
          // Determine status based on API response
          if (data && data[0].Status !=="Error") {
              document.getElementById('responseMessage').textContent = 'successfully Found';
              document.getElementById('successMsg').style.display = 'block';
          } else {
              document.getElementById('responseMessage').textContent = 'There is no Pincode like this';
              document.getElementById('errorMsg').style.display = 'block';
          }
        } catch (error) {
          console.error('Error calling API:', error);
          alert("error");
          document.getElementById('container').style.display = 'block';
          document.getElementById('response-box').style.display = 'none';
       }
     });
    });
  
