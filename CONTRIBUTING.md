# Contributing to URL Shortener

Thank you for your interest in contributing to the URL Shortener project! 🎉

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Docker Desktop (for containerized development)
- Git

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```
3. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```
4. Start development:
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### 🐛 Bug Reports
1. Check existing issues first
2. Use the bug report template
3. Include:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots if applicable

### ✨ Feature Requests
1. Check if the feature already exists
2. Use the feature request template
3. Explain:
   - The problem you're solving
   - Your proposed solution
   - Alternative solutions considered

### 🔧 Code Contributions

#### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

#### Commit Messages
Follow conventional commits:
- `feat: add user authentication`
- `fix: resolve URL validation issue`
- `docs: update API documentation`
- `style: format code with prettier`
- `refactor: simplify URL generation logic`
- `test: add unit tests for URL service`

#### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes
3. Add tests if applicable
4. Update documentation
5. Ensure all tests pass
6. Submit a pull request

#### Code Style
- Use ESLint and Prettier configurations
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

## 🧪 Testing

### Running Tests
```bash
# Backend tests
npm test

# Frontend tests
cd frontend && npm test

# Docker tests
docker-compose up --build
```

### Test Coverage
- Aim for >80% test coverage
- Test both happy path and edge cases
- Include integration tests for API endpoints

## 📚 Documentation

### Code Documentation
- Use JSDoc for functions and classes
- Include examples in documentation
- Keep README.md updated

### API Documentation
- Document all endpoints
- Include request/response examples
- Update OpenAPI spec if applicable

## 🐳 Docker Development

### Local Development
```bash
# Basic setup
docker-compose up --build

# With MongoDB
docker-compose --profile with-mongodb up --build

# Production setup
docker-compose -f docker-compose.prod.yml up --build
```

### Testing Docker Changes
1. Test all Docker configurations
2. Verify health checks work
3. Test container restart scenarios

## 🔒 Security Guidelines

### Security Considerations
- Never commit sensitive data
- Use environment variables for secrets
- Validate all inputs
- Follow OWASP guidelines
- Report security issues privately

### Environment Variables
- Use `.env.example` for documentation
- Never commit `.env` files
- Use strong default values

## 📦 Release Process

### Version Numbering
Follow semantic versioning (SemVer):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Test all features
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag the release

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow project guidelines

### Communication
- Use GitHub issues for bugs and features
- Be clear and concise
- Provide context and examples
- Be patient with responses

## 🏆 Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Given credit for their contributions

## 📞 Getting Help

If you need help:
1. Check existing documentation
2. Search closed issues
3. Ask in GitHub discussions
4. Create a new issue with the "question" label

## 🎯 Areas for Contribution

### High Priority
- [ ] User authentication system
- [ ] Custom short code support
- [ ] Bulk URL shortening
- [ ] Advanced analytics
- [ ] QR code generation

### Medium Priority
- [ ] URL categories/tags
- [ ] Export functionality
- [ ] API rate limiting improvements
- [ ] Mobile app
- [ ] Browser extension

### Low Priority
- [ ] Themes/dark mode
- [ ] URL preview
- [ ] Social sharing
- [ ] URL scheduling
- [ ] A/B testing

Thank you for contributing to URL Shortener! 🚀