document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-message');
    const voiceBtn = document.getElementById('voice-input');
    const quickOptions = document.querySelectorAll('.quick-option');
    const restartBtn = document.getElementById('restart-chat');
    
    // Sample responses for the chatbot
    const botResponses = {
        'greeting': 'Namaste! How can I assist you with government scheme documentation today?',
        'documents': 'To find documents needed for a specific scheme, please tell me which scheme you\'re interested in. For example: "PM-JAY documents" or "crop insurance documents".',
        'aadhaar': 'To get an Aadhaar card:\n1. Visit your nearest Aadhaar enrollment center\n2. Carry proof of identity and address\n3. Fill the enrollment form\n4. Provide biometric data (fingerprints, iris scan)\n5. You\'ll receive an acknowledgment slip with enrollment number\n6. Your Aadhaar card will be delivered by post within 90 days.',
        'income': 'To get an income certificate:\n1. Visit your district office or Gram Panchayat\n2. Fill the application form\n3. Attach required documents (ID proof, address proof, income details)\n4. Submit to the concerned officer\n5. Certificate is usually issued within 15 days.',
        'land': 'To get land records:\n1. Visit your state\'s land records website (like Bhulekh)\n2. Select your district, tehsil, and village\n3. Enter owner name or plot number\n4. View and download records\n5. For mutation, submit application at Tehsil office with required documents.',
        'default': 'I\'m sorry, I didn\'t understand that. Could you please rephrase your question? You can ask about documents needed for schemes, or how to get Aadhaar, income certificate, or land records.'
    };
    
    // Function to add a message to the chat
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender + '-message');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        // If message contains newlines, create separate paragraphs
        if (message.includes('\n')) {
            const paragraphs = message.split('\n');
            paragraphs.forEach(para => {
                const p = document.createElement('p');
                p.textContent = para;
                contentDiv.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = message;
            contentDiv.appendChild(p);
        }
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to handle user input
    function handleUserInput() {
        const text = userInput.value.trim();
        if (text === '') return;
        
        // Add user message to chat
        addMessage('user', text);
        userInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            let response;
            
            if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi') || text.toLowerCase().includes('namaste')) {
                response = botResponses['greeting'];
            } 
            else if (text.toLowerCase().includes('document') || text.toLowerCase().includes('paper') || text.toLowerCase().includes('required')) {
                response = botResponses['documents'];
            }
            else if (text.toLowerCase().includes('aadhaar') || text.toLowerCase().includes('uidai')) {
                response = botResponses['aadhaar'];
            }
            else if (text.toLowerCase().includes('income') || text.toLowerCase().includes('certificate')) {
                response = botResponses['income'];
            }
            else if (text.toLowerCase().includes('land') || text.toLowerCase().includes('record') || text.toLowerCase().includes('property')) {
                response = botResponses['land'];
            }
            else {
                response = botResponses['default'];
            }
            
            addMessage('bot', response);
        }, 1000);
    }
    
    // Event listeners
    sendBtn.addEventListener('click', handleUserInput);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    voiceBtn.addEventListener('click', function() {
        alert('Voice input would be implemented in a production environment');
        // In a real implementation, this would use the Web Speech API
    });
    
    quickOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionType = this.dataset.option;
            addMessage('user', this.textContent);
            
            setTimeout(() => {
                addMessage('bot', botResponses[optionType]);
            }, 1000);
        });
    });
    
    restartBtn.addEventListener('click', function() {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Namaste! I'm Sahyak, your guide to government scheme documentation. How can I help you today?</p>
                </div>
            </div>
            <div class="message bot-message">
                <div class="message-content">
                    <p>You can ask me about:</p>
                    <div class="quick-options">
                        <button class="quick-option" data-option="documents">Documents needed for a scheme</button>
                        <button class="quick-option" data-option="aadhaar">How to get Aadhaar card</button>
                        <button class="quick-option" data-option="income">How to get income certificate</button>
                        <button class="quick-option" data-option="land">How to get land records</button>
                    </div>
                </div>
            </div>
        `;
        
        // Re-attach event listeners to new quick options
        document.querySelectorAll('.quick-option').forEach(option => {
            option.addEventListener('click', function() {
                const optionType = this.dataset.option;
                addMessage('user', this.textContent);
                
                setTimeout(() => {
                    addMessage('bot', botResponses[optionType]);
                }, 1000);
            });
        });
    });
});