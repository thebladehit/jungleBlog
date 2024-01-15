# Jungle Blog
### Jungle Blog - ChatGPT-powered Web-Blog Documentation
Welcome to the Jungle Blog GitHub repository! Jungle Blog is an innovative web-blog project that harnesses the capabilities of ChatGPT to create cool and engaging stories. This documentation provides essential information to help you understand, contribute, and deploy Jungle Blog.

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
3. [Usage](#usage)
    * [Configuring ChatGPT](#configuring-chatgpt)
    * [Create DataBase](#creating-data-base)
    * [Deploying Jungle Blog](#deploying-jungle-blog)
4. [Contributing](#contributing)
5. [Issues and Bug Reports](#issues-and-bug-reports)
6. [License](#license)

## Introduction<a name="introduction"></a>
The motivation for creating this project was to explore the possibilities of the gpt chat API and various tools for working as a software engineer.

## Getting Started<a name="getting-started"></a>

### Prerequisites: <a name="prerequisites"></a>
* Node JS
* PostgreSQL
* ChatGPT API key (Get yours at OpenAI)

### Installation<a name="installation"></a>
1. Clone the Jungle Blog repository:
```bash
git clone https://github.com/thebaldehit/jungleBlog.git
cd jungleBlog
```
2. Install dependencies:
```bash
cd backend
npm i
cd ../jungleBlog
npm i
cd ../adminPanel
npm i
```

## Usage<a name="usage"></a>
### Configuring ChatGPT<a name="configuring-chatgpt"></a>
1. Obtain a ChatGPT API key from [OpenAI](https://platform.openai.com/signup/).
2. Create **.env** file from **.env.sample**
3. Setup **.env** file with your data (copy the token from the first subsection to .env )

### Create DataBase<a name="creating-data-base"></a>
1. Run **create.js** script to create DataBase (before it run Postgres service):
```bash
cd backend/db
node create.js
```

### Deploying Jungle Blog<a name="deploying-jungle-blog"></a>
1. Create **.env** file from **.env.sample** (if you have not done it yet)
2. Fill data to **.env** (fill all fields otherwise app will not work)
3. Run up:
```bash
cd backend
node index.js
```

## Contributing<a name="contributing"></a>
We welcome contributions! Please follow our [contribution guidelines](CONTRIBUTING.md) to get started.

## Issues and Bug Reports<a name="issues-and-bug-reports"></a>
If you encounter any issues or want to report a bug, please open an issue on the [issue tracker](../../issues).

## License<a name="license"></a>
Jungle Blog is licensed under the [MIT License](LICENSE).

Thank you for being part of the Jungle Blog community! Happy coding! 🌿📝