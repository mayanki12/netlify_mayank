// Wrap the entire code in an IIFE(Immediately Invoked Function Expression) to prevent global namespace pollution
 
(function() {
    let isChatActive = true;
    let inactivityTimer = null;       // Will hold the setTimeout reference
    let inactivityTimeout = 120000;
   
    // Function to insert CSS styles dynamically
    // restarting point at line 9
    function insertChatbotStyles() {
        const style = document.createElement('style');
        style.id = 'chatbot-styles';
        style.innerHTML = `
   
        #Phoennie-chatbot-container {
            font-family: 'Futura', Arial, sans-serif;
        }
   
        /* Prefix all your CSS selectors with #Phoennie-chatbot-container */
        #Phoennie-chatbot-container #chatbot-toggler {
            position: fixed;
            bottom: 70px;
            right: 70px;
            border: none;
            width: 150px;
            height: 150px;
            border-radius: 55%;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
        }
   
        #Phoennie-chatbot-container .toggler-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20%;
        }
   
        #Phoennie-chatbot-container #chatbox-container {
            position: fixed;
            bottom: 40px;
            right: 20px;
            width: 410px;
            max-width: 90%;
            height: 70%;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 999;
        }
   
        #Phoennie-chatbot-container #chatbox-header {
            background-color: #002CEE;
            color: #fff;
            padding: 6px 8px;
            text-align: center;
            position: relative;
            font-weight: bold;
            font-size: 14px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
   
        #Phoennie-chatbot-container .header-title {
            background-color: #002CEE; /* Background for Phoennie Chatbot */
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
        }
   
        #Phoennie-chatbot-container .message-timestamp {
            font-size: 12px;
        }
   
        #Phoennie-chatbot-container .user-message .message-timestamp {
            text-align: right;
        }
   
        #Phoennie-chatbot-container .Phoennie-message .message-timestamp {
            text-align: right;
        }
   
        #Phoennie-chatbot-container #chatbox-close {
            position: absolute;
            right: 10px;
            top: 10px;
            background: none;
            border: none;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
        }
   
        /* Styles for user info form */
        #Phoennie-chatbot-container #user-info-form {
            display: flex;
            flex-direction: column;
            padding: 10px;
        }
   
        #Phoennie-chatbot-container #user-info-form input {
            padding: 6px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 13px;
            box-sizing: border-box;
        }
   
        #Phoennie-chatbot-container #user-info-form button {
            padding: 8px;
            background-color: #002CEE;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 13px;
        }
   
        #Phoennie-chatbot-container #user-info-form button:hover {
            background-color: #001a99;
        }
   
        /* Messages area */
        #Phoennie-chatbot-container #messages {
            flex: 5;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 6px;
            background-color: #f7f7f7;
            font-size: 14px;
        }
   
        #Phoennie-chatbot-container .message {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
        }
   
        #Phoennie-chatbot-container .bio-text {
            font-size: 14px;
            color: #fff;
            text-align: center;
            padding: 5px 10px;
            line-height: 1.4;
            font-weight: 400;
        }
   
        #Phoennie-chatbot-container .feedback-container {
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            font-size: 14px;
        }
   
        #Phoennie-chatbot-container .feedback-container button {
            margin-top: 10px;
            padding: 8px 12px;
            background: #002CEE;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
   
        #Phoennie-chatbot-container .feedback-container button:hover {
            background: #001a99;
        }
   
        /* Message content */
        #Phoennie-chatbot-container .message-content {
            max-width: 100%;
            display: flex;
            align-items: flex-start;
            flex-wrap: nowrap;
        }
   
        #Phoennie-chatbot-container .typing {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
   
        #Phoennie-chatbot-container .dot {
            height: 10px;
            width: 10px;
            background-color: #002CEE;
            border-radius: 50%;
            margin: 0 3px;
            animation: bounce 1.5s infinite;
        }
   
        #Phoennie-chatbot-container #chatbox-minimize {
          position: absolute;
          right: 30px;
          top: 10px;
          background: none;
          border: none;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
      }
   
      #Phoennie-chatbot-container #chatbox-container {
          transition: all 0.3s ease-in-out;
      }
   
        #Phoennie-chatbot-container .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
   
        #Phoennie-chatbot-container .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
   
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
   
        /* User messages */
        #Phoennie-chatbot-container .user-message {
            justify-content: flex-end;
        }
   
        #Phoennie-chatbot-container .user-message .message-content {
            flex-direction: row-reverse;
        }
   
        /* Phoennie messages */
        #Phoennie-chatbot-container .Phoennie-message {
            justify-content: flex-start;
        }
   
        #Phoennie-chatbot-container .msg-container {
            padding: 7px;
            border-radius: 10px;
            //margin: 5px;
            position: relative;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            overflow-wrap: anywhere;
            word-wrap: break-word;
            word-break: break-word;
            max-width: 270px;
            font-family: 'Futura', Arial, sans-serif;
        }
   
        #Phoennie-chatbot-container .recommendations-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 7px;
        }
   
        /* Recommendation Button */
        #Phoennie-chatbot-container .recommendation-button {
           /* padding: 8px 5px; */
            border: none;
            border-radius: 10px;
            background-color: hsl(230, 31%, 90%);
            color: #002CEE;
            cursor: pointer;
            font-size: 14px;
            /*flex: 1 1 calc(33.333% - 10px); */
           /* max-width: calc(33.333% - 10px); */
            text-align: center;
            box-sizing: border-box;
        }
   
        #Phoennie-chatbot-container .Phoennie-container {
            display: flex;
            align-items: center;
            margin-bottom: 5px; /* Adjust spacing as needed */
        }
   
        #Phoennie-chatbot-container .green-dot {
            width: 15px;
            height: 15px;
            background-color: darkgreen;
            border-radius: 50%;
            margin-left: -14px;
            margin-top: 25px;
            border: 2px solid #fff;
        }
   
        #Phoennie-chatbot-container .more-recommendations-button {
            padding: 8px 12px;
            border: none;
            border-radius: 20px;
            background-color: #555;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            flex: 1 1 100%;
            max-width: 150px;
            text-align: center;
        }
   
        #Phoennie-chatbot-container .more-recommendations-button:hover {
            background-color: #333;
        }
   
        #Phoennie-chatbot-container .user-message .msg-container {
            background-color:#002CEE;
            color: white;
        }
   
        #Phoennie-chatbot-container .Phoennie-message .msg-container {
            background-color: lavender;
            color: black;
            text-align: left !important;
        }
   
        /* Chat bubble tails */
        #Phoennie-chatbot-container .msg-container::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
        }
   
        #Phoennie-chatbot-container .user-message .msg-container::after {
            right: -10px;
            border-left: 10px solid #e6e6e6;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            top: 15px;
        }
   
        #Phoennie-chatbot-container .Phoennie-message .msg-container::after {
            left: -10px;
            border-right: 10px solid lavender;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            top: 15px;
        }
   
        #Phoennie-chatbot-container .Phoennie-image {
            width: 30px;
            height: 30px;
            border-radius: 20%;
            margin-right: 10px;
            vertical-align: top;
            max-width: 100%;
            height: auto;
        }
   
        #Phoennie-chatbot-container .Phoennie-message .Phoennie-image {
            margin-top: 20px;
        }
   
        #Phoennie-chatbot-container .user-message .Phoennie-image {
            margin-left: 10px;
            margin-right: 0;
        }
   
        #Phoennie-chatbot-container #input-area {
            display: flex;
            border-top: 1px solid #ddd;
        }
   
        #Phoennie-chatbot-container #user-input {
            flex: 1;
            padding: 10px;
            border: none;
            outline: none;
            font-size: 14px;
            height: 40px;
        }
   
        #Phoennie-chatbot-container #send-button {
            width: 80px;
            padding: 10px;
            border: none;
            background-color: #002CEE;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            /*height: 40px;*/
        }
   
        /* Responsive adjustments */
        @media screen and (max-width: 480px) {
            #Phoennie-chatbot-container #chatbox-container {
                width: 90%;
                right: 5%;
                bottom: 80px;
            }
   
            #Phoennie-chatbot-container #chatbot-toggler {
                bottom: 10px;
                right: 10px;
            }
   
            #Phoennie-chatbot-container .message-content {
                max-width: 100%;
            }
   
            #Phoennie-chatbot-container .recommendations-container .recommendation-button,
            #Phoennie-chatbot-container .recommendations-container .more-recommendations-button {
                flex: 1 1 calc(100% - 10px);
            }
        }
        `;
        document.head.appendChild(style);
    }    
   
    // Function to create the chatbot toggler button
    function createChatbotToggler() {
        const chatbotToggler = document.createElement('button');
        chatbotToggler.id = 'chatbot-toggler';
        chatbotToggler.setAttribute('aria-label', 'Open Chatbot');
   
        const togglerImage = document.createElement('img');
        togglerImage.src =  'static/Hologram_trn_3.gif';
        togglerImage.alt = 'Phoennie';
        togglerImage.className = 'toggler-image';
   
        chatbotToggler.appendChild(togglerImage);
        return chatbotToggler;
    }
   
    // Function to create chatbox elements
    function createChatboxContainerElements() {
        const chatboxContainer = document.createElement('div');
        chatboxContainer.id = 'chatbox-container';
   
        const chatboxMinimize = document.createElement('button');
        chatboxMinimize.id = 'chatbox-minimize';
        //chatboxMinimize.setAttribute('aria-label', 'Minimize Chatbot');
        chatboxMinimize.innerHTML = '&#8722;'; // HTML code for a minus symbol
   
        // Chatbox Header for Phoennie Title
        const chatboxHeader = document.createElement('div');
        chatboxHeader.id = 'chatbox-header';
   
        const headerTitle = document.createElement('div');
        headerTitle.className = 'header-title';
        headerTitle.textContent = 'Phoenix';
   
        // Create the bio text element
        const bioText = document.createElement('div');
        bioText.className = 'bio-text';
        bioText.textContent = "Here to help you...";
   
        const chatboxClose = document.createElement('button');
        chatboxClose.id = 'chatbox-close';
        chatboxClose.setAttribute('aria-label', 'Close Chatbot');
        chatboxClose.innerHTML = '&times;';
   
        chatboxHeader.appendChild(headerTitle);
        chatboxHeader.appendChild(bioText);
        chatboxHeader.appendChild(chatboxClose);
        chatboxHeader.appendChild(chatboxMinimize);
   
        const messagesDiv = document.createElement('div');
        messagesDiv.id = 'messages';
   
        // Input Area
        const inputArea = document.createElement('div');
        inputArea.id = 'input-area';
   
        const userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.id = 'user-input';
        userInput.placeholder = 'Type your message here...';
   
        const sendButton = document.createElement('button');
        sendButton.id = 'send-button';
        sendButton.textContent = 'Send';
   
        inputArea.appendChild(userInput);
        inputArea.appendChild(sendButton);
   
        // Assemble Chatbox Container
        chatboxContainer.appendChild(chatboxHeader);
        chatboxContainer.appendChild(messagesDiv);
        chatboxContainer.appendChild(inputArea);
   
        return {
            chatboxContainer,
            chatboxClose,
            messagesDiv,
            userInput,
            sendButton,
            chatboxMinimize
        };
    }    
   
    // Function to create the chatbot container and its contents
    function createChatbotContainer() {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'Phoennie-chatbot-container';
   
        // Create chatbot toggler and chatbox container elements
        const chatbotToggler = createChatbotToggler();
        const chatboxElements = createChatboxContainerElements();
   
        // Append chatbot elements to the container
        chatbotContainer.appendChild(chatboxElements.chatboxContainer);
        chatbotContainer.appendChild(chatbotToggler);
   
        // Append the container to the body
        document.body.appendChild(chatbotContainer);
   
        return {
            chatbotToggler,
            chatboxContainer: chatboxElements.chatboxContainer,
            chatboxClose: chatboxElements.chatboxClose,
            messagesDiv: chatboxElements.messagesDiv,
            userInput: chatboxElements.userInput,
            sendButton: chatboxElements.sendButton
        };
    }
   
    // Function to initialize the chatbot
    function initializeChatbot() {
        // Insert CSS styles
        insertChatbotStyles();
        const {
            chatbotToggler,
            chatboxContainer,
            chatboxClose,
            messagesDiv,
            userInput,
            sendButton,
        } = createChatbotContainer();
   
        const chatboxMinimize = document.getElementById('chatbox-minimize');
   
        chatboxMinimize.addEventListener('click', function () {
          chatboxContainer.style.display = 'none'; // Hide the chatbox container
          chatbotToggler.style.display = 'flex'; // Show the toggler button
      });
   
        // Function to request user information
    function requestUserInfo() {
        messagesDiv.innerHTML = ''; // Clear previous messages
   
        addMessage("Hi there! To start, please provide your Name and E-mail ID.", 'Phoennie-message', true);
   
        // Create a form for user input
        const formDiv = document.createElement('div');
        formDiv.id = 'user-info-form';
   
        // Create input for name
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Your Name';
        nameInput.id = 'user-name-input';
        nameInput.style.marginBottom = '10px';
        nameInput.style.width = '100%';
   
        // Create input for email
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Your Email ID';
        emailInput.id = 'user-email-input';
        emailInput.style.marginBottom = '10px';
        emailInput.style.width = '100%';
   
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.id = 'user-info-submit';
        submitButton.style.width = '100%';
   
        // Append inputs and button to form
        formDiv.appendChild(nameInput);
        formDiv.appendChild(emailInput);
        formDiv.appendChild(submitButton);
   
        // Append form to messagesDiv
        messagesDiv.appendChild(formDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
   
        // Disable the main input area while collecting user info
        userInput.disabled = true;
        sendButton.disabled = true;
   
        // Handle form submission
        submitButton.addEventListener('click', function() {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
   
            if (name === '' || email === '') {
                alert('Please enter both your name and email ID.');
                return;
            }
   
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
   
            // Store user info in sessionStorage
            const userInfo = { name, email };
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
   
            // Store user info
            window.userName = name;
            window.userEmail = email;
   
            // Remove the form
            formDiv.remove();
   
            // Re-enable the main input area
            userInput.disabled = false;
            sendButton.disabled = false;
   
            showWelcomeMessage();
        });
    }
   
        // Existing JavaScript code
        function showWelcomeMessage() {
            messagesDiv.innerHTML = ''; // Clear previous messages
       
            const welcomeMessages = [
                "I am Phoennie, How can I assist you today?",
                "I'm Phoennie, How may I help you today?",
                "Phoennie here, Let me know if you have any questions.",
                "I'm Phoennie, How can I assist you?"
            ];
       
            // Select a random message from the array
            const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
            const randomMessage = `Hello ${window.userName}! ` + welcomeMessages[randomIndex];
       
            // Simulate typing animation before showing the message
            addTypingAnimation();
            setTimeout(() => {
                removeTypingAnimation();
                addMessage(randomMessage, 'Phoennie-message', true);
            }, 1500);
        }        
   
        function addTypingAnimation() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message Phoennie-message';
            typingDiv.id = 'typing-indicator';
   
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
   
            const PhoennieImg = document.createElement('img');
            PhoennieImg.src = 'static/Phoenix.png';
            PhoennieImg.alt = 'Phoennie';
            PhoennieImg.className = 'Phoennie-image';
            PhoennieImg.loading = 'lazy'; // Lazy load the image for better performance
   
            const msgContainer = document.createElement('div');
            msgContainer.className = 'msg-container';
   
            const typing = document.createElement('div');
            typing.className = 'typing';
   
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot';
                typing.appendChild(dot);
            }
   
            msgContainer.appendChild(typing);
            messageContent.appendChild(PhoennieImg);
            messageContent.appendChild(msgContainer);
            typingDiv.appendChild(messageContent);
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
   
        function removeTypingAnimation() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }                      
   
        function addMessage(text, className, isPhoennie) {
            const htmlContent = marked.parse(text);
            const sanitizedHTML = DOMPurify.sanitize(htmlContent);
       
            const modifiedHTML = sanitizedHTML.replace(/<a href="([^"]+)"/g, function(match, p1) {
                let href = p1;
                if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('mailto:')) {
                    href = 'https://' + href;
                }
                return `<a target="_blank" href="${href}"`;
            });
   
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${className}`;
            messageDiv.style.alignItems = "flex-start";
   
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
   
            const messageBubble = document.createElement('div');
            messageBubble.className = 'msg-container';
   
           // Create a container for the message text
            const messageTextContainer = document.createElement('div');
            messageTextContainer.innerHTML = modifiedHTML;
   
            // Create a timestamp element
            const timestamp = document.createElement('div');
            timestamp.className = 'message-timestamp';
            timestamp.textContent = getCurrentTime();
   
            if (isPhoennie) {
                const PhoennieImg = document.createElement('img');
                PhoennieImg.src = 'static/Phoenix.png';
                PhoennieImg.alt = 'Phoennie';
                PhoennieImg.className = 'Phoennie-image';
           
                // Create the green dot element
                const greenDot = document.createElement('span');
                greenDot.className = 'green-dot';
           
                // Create the "Team Phoenix" label
                const teamPhoennieLabel = document.createElement('div');
                teamPhoennieLabel.textContent = 'Team Phoenix';
                teamPhoennieLabel.style.color = '#002CEE';
                teamPhoennieLabel.style.fontWeight = 'bold';
                teamPhoennieLabel.style.marginBottom = '5px';
           
                const PhoennieImageContainer = document.createElement('div');
                PhoennieImageContainer.style.display = 'flex';
                PhoennieImageContainer.style.alignItems = 'center';
                PhoennieImageContainer.appendChild(PhoennieImg);
                PhoennieImageContainer.appendChild(greenDot);
               
                messageBubble.appendChild(teamPhoennieLabel);
                messageBubble.appendChild(messageTextContainer);
                messageBubble.appendChild(timestamp);
                messageContent.appendChild(PhoennieImageContainer);
                messageContent.appendChild(messageBubble);
            } else {
   
                // Add user's name label on top of user messages
                const userNameLabel = document.createElement('div');
                userNameLabel.textContent = `${window.userName}`;
                userNameLabel.style.color = 'white';
                userNameLabel.style.fontWeight = 'bold';
                userNameLabel.style.marginBottom = '5px';
       
                messageBubble.appendChild(userNameLabel);
                messageBubble.appendChild(messageTextContainer);
                messageBubble.appendChild(timestamp);
                messageContent.appendChild(messageBubble);
            }
       
            messageDiv.appendChild(messageContent);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
   
            // Log the conversation in sessionStorage
                const chatLog = JSON.parse(sessionStorage.getItem('chatLog')) || [];
                const logEntry = {
                    sender: isPhoennie ? 'bot' : 'user',
                    message: text,
                    timestamp: new Date().toISOString(),
                };
                chatLog.push(logEntry);
                sessionStorage.setItem('chatLog', JSON.stringify(chatLog));
            }
   
        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let ampm = 'AM';
       
            if (hours >= 12) {
                ampm = 'PM';
                if (hours > 12) hours -= 12;
            } else if (hours === 0) {
                hours = 12;
            }
       
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return `${hours}:${minutes} ${ampm}`;
        }
   
      function showInactivityMessage() {
        addMessage(
          "Hope we've solved your query. If you have any more questions, just let me know!",
          'Phoennie-message',
          true
        );
      }
   
      function resetInactivityTimer() {
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }
   
        inactivityTimer = setTimeout(() => {
            showInactivityMessage();  // Show a simple message instead of the feedback form
        }, inactivityTimeout);
      }
   
        function showBotResponse(message, callback) {
            if (!message) {
                console.error("Empty or undefined message passed to showBotResponse");
                return;
            }
       
            addTypingAnimation();
            const typingDelay = Math.min(message.length * 30, 3000);
            setTimeout(() => {
                removeTypingAnimation();
                addMessage(message, 'Phoennie-message', true);
                resetInactivityTimer();
                if (callback) callback();
                updateHubSpotConversation();
            }, typingDelay);
        }
   
        function openServiceLink(link) {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                // Load the external link in an iframe
                mainContent.innerHTML = `<iframe src="${link}" width="100%" height="100%" style="border:none;"></iframe>`;
            }
        }
       
        function sendMessage() {
          const userMessage = userInput.value.trim();
          if (userMessage === '') return;
       
          // 1) Show it on the screen
          addMessage(userMessage, 'user-message', false);
          // 2) Reset inactivity timer
          resetInactivityTimer();
          // 3) Clear input box
          userInput.value = '';
       
          // 4) Send to back end for an answer
          callBackendForAnswer(userMessage);
        }
       
        // callBackendForAnswer:
        async function callBackendForAnswer(userMessage) {
          try {
            addTypingAnimation();
       
            // const response = await fetch('https://flaski-api-testing-2.onrender.com/chat', {
            // const response = await fetch('http://192.168.4.106:8085/chat', {
            const response = await fetch('https://flaski-api-testing-2.onrender.com/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: userMessage }),
            });
       
            removeTypingAnimation();
            if (!response.ok) {
              throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }
       
            const data = await response.json();
            // data.response = AI answer
            // data.service_link = optional link from PDF (if any)
       
            showBotResponse(data.response, () => {
              // 2) If the back-end returned a link, open it in iframe
              if (data.service_link) {
                openServiceLink(data.service_link);
              }
            });
       
          } catch (error) {
            removeTypingAnimation();
            console.error('Error in callBackendForAnswer:', error);
            showBotResponse("Oops! Something went wrong. Please try again later.");
          }
        }      
       
        chatbotToggler.addEventListener('click', function() {
            isChatActive = true; // Mark chatbot as active
            activeRequestId = null; // Reset active request ID
            chatboxContainer.style.display = 'flex';
            chatbotToggler.style.display = 'none';
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
              if (!userInfo.name || !userInfo.email) {
                  messagesDiv.innerHTML = ''; // Clear in order to show user-info form
                  requestUserInfo();  
              } else {
                  if (messagesDiv.innerHTML.trim() === '') {
                      loadChatHistory();
                  }
                  // Optionally show a short "Welcome back" or do nothing
              }
              resetInactivityTimer();
        });  
       
        function loadChatHistory() {
          messagesDiv.innerHTML = ''; // Start fresh
     
          const chatLog = JSON.parse(sessionStorage.getItem('chatLog')) || [];
          chatLog.forEach(entry => {
              if (entry.sender === 'bot') {
                  addMessage(entry.message, 'Phoennie-message', true);
              } else {
                  addMessage(entry.message, 'user-message', false);
              }
          });
      }    
       
        chatboxClose.addEventListener('click', function() {
            isChatActive = false; // Mark chatbot as inactive
            activeRequestId = null; // Cancel pending requests
            clearSessionStorage(); // Clear session data
            chatboxContainer.style.display = 'none';
            chatbotToggler.style.display = 'flex';
   
            if (inactivityTimer) {
                clearTimeout(inactivityTimer);
            }
        });
   
        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    (function initializeSessionStorage() {
        if (!sessionStorage.getItem('chatLog')) {
            sessionStorage.setItem('chatLog', JSON.stringify([]));
        }
        if (!sessionStorage.getItem('userInfo')) {
            sessionStorage.setItem('userInfo', JSON.stringify({ name: '', email: '' }));
        }
    })();  
   
    function clearSessionStorage() {
        sessionStorage.removeItem('chatLog');
        sessionStorage.removeItem('userInfo');
        window.currentFlow = '';
        window.currentFlowInstance = null;
        window.userName = '';
        window.userEmail = '';
        window.userPhone = '';
        console.log("Session storage and state cleared.");
    }  
   
    initializeChatbot();
   
    async function updateHubSpotConversation() {
      //Get user info from sessionStorage
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
      //Get the entire chat log so far
      const chatLog = JSON.parse(sessionStorage.getItem('chatLog')) || [];
   
      //A single string from the conversation
      //    e.g., "[USER] Hello\n[BOT] Hi there\n..."
      let conversationText = '';
      chatLog.forEach(entry => {
        conversationText += `[${entry.sender.toUpperCase()}] ${entry.message}\n`;
      });
   
      //HubSpot submission endpoint
      const portalId = "23620181";
      const formId = "016577c7-b66d-4761-b45c-6180de675f16";
      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
   
      //the payload with fields: firstname, email, share_your_requirement
      const payload = {
        fields: [
          { name: 'firstname', value: userInfo.name || '' },
          { name: 'email', value: userInfo.email || '' },
          { name: 'share_your_requirement', value: conversationText }
        ]
      };
   
      console.log('Payload to be sent to HubSpot:', JSON.stringify(payload, null, 2));
   
      //Send the POST request to HubSpot
      try {
        const response = await fetch(hubspotUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
   
        if (!response.ok) {
          console.error('HubSpot update error:', result);
        } else {
          console.log('HubSpot update success:', result);
        }
      } catch (error) {
        console.error('Network/Server error updating HubSpot:', error);
      }
    }
  })();