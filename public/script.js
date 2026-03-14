class URLShortener {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.currentShortCode = null;
    }

    initializeElements() {
        this.form = document.getElementById('urlForm');
        this.urlInput = document.getElementById('originalUrl');
        this.shortenBtn = document.getElementById('shortenBtn');
        this.spinner = document.getElementById('spinner');
        this.btnText = document.querySelector('.btn-text');
        
        this.resultDiv = document.getElementById('result');
        this.shortUrlInput = document.getElementById('shortUrl');
        this.originalUrlDisplay = document.getElementById('originalUrlDisplay');
        
        this.statsDiv = document.getElementById('stats');
        this.errorDiv = document.getElementById('error');
        this.errorMessage = document.getElementById('errorMessage');
        
        this.copyBtn = document.getElementById('copyBtn');
        this.visitBtn = document.getElementById('visitBtn');
        this.statsBtn = document.getElementById('statsBtn');
        this.newUrlBtn = document.getElementById('newUrlBtn');
        this.closeStatsBtn = document.getElementById('closeStats');
        this.closeErrorBtn = document.getElementById('closeError');
        
        this.clickCount = document.getElementById('clickCount');
        this.createdDate = document.getElementById('createdDate');
        this.shortCodeDisplay = document.getElementById('shortCode');
    }

    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.visitBtn.addEventListener('click', () => this.visitUrl());
        this.statsBtn.addEventListener('click', () => this.showStats());
        this.newUrlBtn.addEventListener('click', () => this.resetForm());
        this.closeStatsBtn.addEventListener('click', () => this.hideStats());
        this.closeErrorBtn.addEventListener('click', () => this.hideError());
        
        // Auto-hide error after 5 seconds
        this.errorTimeout = null;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const url = this.urlInput.value.trim();
        if (!url) {
            this.showError('Please enter a URL');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('Please enter a valid URL (include http:// or https://)');
            return;
        }

        this.setLoading(true);
        this.hideError();
        this.hideResult();
        this.hideStats();

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalUrl: url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to shorten URL');
            }

            this.showResult(data);
        } catch (error) {
            console.error('Error:', error);
            this.showError(error.message || 'Failed to shorten URL. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    setLoading(loading) {
        if (loading) {
            this.shortenBtn.classList.add('loading');
            this.shortenBtn.disabled = true;
        } else {
            this.shortenBtn.classList.remove('loading');
            this.shortenBtn.disabled = false;
        }
    }

    showResult(data) {
        this.shortUrlInput.value = data.shortUrl;
        this.originalUrlDisplay.textContent = data.originalUrl;
        this.currentShortCode = data.shortCode;
        
        this.resultDiv.classList.remove('hidden');
        this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    hideResult() {
        this.resultDiv.classList.add('hidden');
    }

    async showStats() {
        if (!this.currentShortCode) return;

        try {
            const response = await fetch(`/api/stats/${this.currentShortCode}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch stats');
            }

            this.clickCount.textContent = data.clicks;
            this.createdDate.textContent = new Date(data.createdAt).toLocaleString();
            this.shortCodeDisplay.textContent = data.shortCode;
            
            this.statsDiv.classList.remove('hidden');
            this.statsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (error) {
            console.error('Error fetching stats:', error);
            this.showError('Failed to fetch statistics');
        }
    }

    hideStats() {
        this.statsDiv.classList.add('hidden');
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.shortUrlInput.value);
            
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = '✅ Copied!';
            this.copyBtn.classList.add('copied');
            
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
                this.copyBtn.classList.remove('copied');
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            // Fallback for older browsers
            this.shortUrlInput.select();
            document.execCommand('copy');
            this.showError('Copied to clipboard!');
        }
    }

    visitUrl() {
        if (this.shortUrlInput.value) {
            window.open(this.shortUrlInput.value, '_blank');
        }
    }

    resetForm() {
        this.urlInput.value = '';
        this.currentShortCode = null;
        this.hideResult();
        this.hideStats();
        this.hideError();
        this.urlInput.focus();
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorDiv.classList.remove('hidden');
        
        // Clear existing timeout
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
        }
        
        // Auto-hide after 5 seconds
        this.errorTimeout = setTimeout(() => {
            this.hideError();
        }, 5000);
        
        this.errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    hideError() {
        this.errorDiv.classList.add('hidden');
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
            this.errorTimeout = null;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new URLShortener();
});

// Add some nice animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on load
    const elements = document.querySelectorAll('.header, .url-form-container');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});