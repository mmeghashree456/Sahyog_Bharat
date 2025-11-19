document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Form submission handlers
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const otpForm = document.getElementById('otpForm');
    const authContainer = document.querySelector('.auth-container');
    const otpSection = document.getElementById('otpSection');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would typically make an API call to verify credentials
        // For demo purposes, we'll just show the OTP section
        showOTPSection(email);
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const mobile = document.getElementById('signupMobile').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Here you would typically make an API call to register the user
        // For demo purposes, we'll just show the OTP section
        showOTPSection(email);
    });

    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otp = document.getElementById('otp').value;
        
        // Here you would typically make an API call to verify the OTP
        // For demo purposes, we'll just show a success message
        alert('OTP verified successfully!');
        // Redirect to dashboard or home page
        // window.location.href = '/dashboard';
    });

    function showOTPSection(contactInfo) {
        authContainer.style.display = 'none';
        otpSection.style.display = 'block';
        
        // Update the OTP message with the contact info
        const otpMessage = otpSection.querySelector('p');
        otpMessage.textContent = `We have sent an OTP to ${contactInfo}`;
    }

    // Mobile number validation
    const mobileInput = document.getElementById('signupMobile');
    mobileInput.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
    });

    // OTP input validation
    const otpInput = document.getElementById('otp');
    otpInput.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
    });

    // Step navigation functionality
    const stepContents = document.querySelectorAll('.step-content');
    const steps = document.querySelectorAll('.step');
    const prevButton = document.getElementById('prevStep');
    const nextButton = document.getElementById('nextStep');
    let currentStep = 1;

    function updateStepNavigation() {
        // Update step indicators
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else if (index + 1 < currentStep) {
                step.classList.add('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update step content visibility
        stepContents.forEach(content => {
            if (parseInt(content.dataset.step) === currentStep) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Update button states
        prevButton.style.display = currentStep === 1 ? 'none' : 'block';
        nextButton.textContent = currentStep === 6 ? 'Submit' : 'Next';
    }

    prevButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepNavigation();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentStep < 6) {
            // Validate current step before proceeding
            if (validateCurrentStep()) {
                currentStep++;
                updateStepNavigation();
            }
        } else {
            // Final submission
            if (validateCurrentStep()) {
                const signupForm = document.getElementById('signupForm');
                const formData = new FormData(signupForm);
                const data = Object.fromEntries(formData.entries());
                
                // Here you would typically make an API call to register the user
                // For demo purposes, we'll just show the OTP section
                showOTPSection(data.signupEmail);
            }
        }
    });

    function validateCurrentStep() {
        const currentContent = document.querySelector(`.step-content[data-step="${currentStep}"]`);
        const inputs = currentContent.querySelectorAll('input[required]');
        
        for (const input of inputs) {
            if (!input.value) {
                alert('Please fill in all required fields');
                input.focus();
                return false;
            }
        }

        // Additional validation for specific steps
        switch (currentStep) {
            case 2:
                const email = document.getElementById('signupEmail').value;
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address');
                    return false;
                }
                break;
            case 3:
                const mobile = document.getElementById('signupMobile').value;
                if (!isValidMobile(mobile)) {
                    alert('Please enter a valid 10-digit mobile number');
                    return false;
                }
                break;
            case 5:
                const password = document.getElementById('signupPassword').value;
                const confirmPassword = document.getElementById('signupConfirmPassword').value;
                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return false;
                }
                break;
            case 6:
                if (!document.getElementById('termsAgreement').checked) {
                    alert('Please agree to the Terms and Conditions');
                    return false;
                }
                break;
        }

        return true;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidMobile(mobile) {
        return /^\d{10}$/.test(mobile);
    }

    // Initialize step navigation
    updateStepNavigation();
}); 