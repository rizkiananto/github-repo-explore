<h3 align="center">
  <br>
    <a target="_blank" href="https://rizkianto-github-explore.netlify.app"><img src="https://github.com/user-attachments/assets/b77d8e5b-d051-4ba9-a1ae-e9510273229d" alt="gqpf" width="700"></a>
  <br><br>
  Simple and Clean GitHub Explorer Web App
</h3>
<p align="center">
  A fast, responsive React application for discovering GitHub users and exploring their public repositories. Built with modern React patterns, TypeScript, and comprehensive testing.
</p>
<br>
<a href="https://rizkianto-github-explore.netlify.app" target="_blank"><p align="center">[Demo Website]</p></a>
<br>
<p align="center">
  <img width="773" alt="Screenshot 2025-06-04 at 12 37 48" src="https://github.com/user-attachments/assets/62e56c5a-f9f2-4740-ab9a-a4af2b305930" />
</p>

<br><br>

## Key Features

- **Real-time Search** - Find GitHub users with debounced search, just type and wait ✨
- **User Profiles** - View user avatars and username. Links to their complete profile on GitHub is also provided
- **Repository Explorer** - Browse public repositories related to a certain GitHub user
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean interface built with Mantine UI
<br><br>


## Tech Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/docs/)
- **UI Library:** [Mantine UI](https://mantine.dev/)
- **State Management:** React Context API
- **Testing:** [Vitest](https://vitest.dev/)
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Data Source:** [GitHub Rest API](https://docs.github.com/en/rest)

<br>

## 🚀 Quick Start

#### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

#### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-profile-finder.git
   cd github-profile-finder
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🧪 Testing

This project includes comprehensive testing coverage:

### Run Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```
<br><br>
## 🎯 Usage

### Search for Users
1. Type any GitHub username in the search box. Please use GitHub's username format (alphanumeric characters and hyphens (`-`) only).
2. Results appear automatically after 1 second after you stop typing
3. Results are limited to 5 per username search.
4. The total number of users matching your search is displayed below the input box, letting you know if there are more results than shown.
5. The link to the user's GitHub Account is provided within the accordion details. Click the user's box to expand it
 
### Explore Repositories
1. Click on any user accordion to expand
2. View repository details including:
   - Repository name and description
   - Programming language
   - Star, fork, and watcher counts
   - Direct link to GitHub repository

<br>

## 💡 Tech Improvement Notes
If the project is developed further and gains more features, the following improvements could be considered:
- Create API abstraction. When you need to call the API numerous times, an API abstraction will be helpful to maintain consistent fetching and standardize responses.
- Use `.env` files instead of `src/constants/*` folders. If you plan to go to production and have multiple variables that will be called in various files, using `.env` is a better approach.
- Add a personal access token when making requests to the GitHub REST API. Unauthenticated requests are limited to 60 per hour, while authenticated requests are granted 5000 per hour.

<br>

## Contact Me

- **GitHub**: [@rizkiananto](https://github.com/rizkiananto)
- **Email**: akbarrizkianto@gmail.com
- **LinkedIn**: [akbarrizki](https://www.linkedin.com/in/akbarrizki/)
