# Software Development Projects

- **Arduino / IoT**: `Arduino/SmartTemp` is an embedded system project implemented in C/C++ for Arduino-compatible hardware. It reads analog temperature sensor data, controls an RGB LCD display, and transmits telemetry via Ethernet.
- **DevOps / Cloud**: `Devops/todo-app` is a full-stack application with a React frontend, TypeScript/Node.js backend, Docker containerization, Azure infrastructure-as-code, Kubernetes deployment, Helm packaging, and CI/CD automation.
- **Backend services**: `Node.js` contains Express-based APIs, a GraphQL service, database access using Sequelize and SQLite, RabbitMQ messaging patterns, and Redis data structure examples.
- **Mobile apps**: `React Native` includes Expo-based mobile applications built with React Native, TypeScript, navigation, and Tailwind-style responsive UI.
- **Web development**: `Web Development` includes React, Angular, vanilla JavaScript, Sass, TypeScript, and build tool examples illustrating modern frontend engineering.
- **Compiler and language tools**: `Compiler` includes lexer/parser design, syntax tree output, and language processing work that demonstrates compiler construction concepts.
- **Logic programming**: `Prolog` Practice exercises in Prolog.
- **Unity**: `Unity/NaVR` Battleship game built using Unity game engine.

## How to explore the repository

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```

2. Open the desired project folder in your editor.

3. Run most Node.js and JavaScript projects:
   ```bash
   cd <project-folder>
   npm install
   npm start
   ```

4. Run React Native projects:
   ```bash
   cd "React Native/chat-app"
   npm install
   npx expo start
   ```

5. Run Angular projects:
   ```bash
   cd "Web Development/angular/hello-world"
   ng serve
   ```

6. Run the DevOps todo app locally:
   ```bash
   cd Devops/todo-app
   docker-compose up --build
   ```

7. Run compiler examples:
   ```bash
   cd Compiler
   Build.bat
   ```

8. Run Prolog examples:
   ```bash
   swipl
   consult('menu.pl').
   ```