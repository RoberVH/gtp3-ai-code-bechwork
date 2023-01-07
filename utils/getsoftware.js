export const callGenerateEndpoint = async (prompt) => {
  
    if (prompt.trim().length===0) {
      errorMsg(strTexts[lang].noInput)
      return}
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  
    const data = await response.json();
    const { output } = data;
  
    return(`${output.text}`);
  }