// Core application logic for TailTalks
document.addEventListener('DOMContentLoaded', function() {
    // Homepage form handling
    const animalForm = document.getElementById('animalForm');
    const skipBtn = document.getElementById('skipBtn');
    
    if (animalForm) {
        animalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const animalData = {
                name: this.querySelector('input[type="text"]').value,
                type: this.querySelector('select').value,
                age: this.querySelector('input[type="number"]').value
            };
            localStorage.setItem('animalData', JSON.stringify(animalData));
            window.location.href = 'issue.html';
        });
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            localStorage.setItem('animalData', JSON.stringify({}));
            window.location.href = 'issue.html';
        });
    }

    // Feedback form handling
    const feedbackForm = document.getElementById('feedbackForm');
    const skipFeedbackBtn = document.getElementById('skipFeedbackBtn');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your feedback!');
            window.location.href = 'index.html';
        });
    }

    if (skipFeedbackBtn) {
        skipFeedbackBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Issue page form handling
    const issueForm = document.getElementById('issueForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const imageUpload = document.getElementById('imageUpload');

    if (imageUpload) {
        imageUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('uploadArea').classList.add('hidden');
                    document.getElementById('previewContainer').classList.remove('hidden');
                    document.getElementById('imagePreview').src = e.target.result;
                }
                reader.readAsDataURL(this.files[0]);
                analyzeBtn.disabled = false;
            }
        });

        document.getElementById('removeImageBtn')?.addEventListener('click', function() {
            document.getElementById('uploadArea').classList.remove('hidden');
            document.getElementById('previewContainer').classList.add('hidden');
            document.getElementById('imagePreview').src = '';
            imageUpload.value = '';
            analyzeBtn.disabled = true;
        });
    }

    if (issueForm) {
        issueForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fileInput = this.querySelector('input[type="file"]');
            
            if (!fileInput.files.length) {
                alert('Please upload an image of the issue before proceeding');
                fileInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                fileInput.closest('div').classList.add('border-red-500');
                return;
            }

            const issueData = {
                symptoms: this.querySelector('textarea').value,
                image: fileInput.files[0]?.name
            };
            localStorage.setItem('issueData', JSON.stringify(issueData));
            window.location.href = 'report.html';
        });
    }
});