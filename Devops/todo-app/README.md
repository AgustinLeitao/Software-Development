<h1 align="center">
  🚀 Full-Stack Todo App on Azure Kubernetes Service (AKS)
</h1>

<p align="center">
  A complete, production-ready Todo application demonstrating a modern full-stack architecture, Infrastructure as Code (IaC), and automated CI/CD pipelines.
</p>

---

## 🏗 Architecture Overview

This project is divided into several logical components:

* **🎨 Frontend (`client/`)**: A fast, responsive user interface built with React, Vite, and TypeScript.
* **⚙️ Backend (`server/`)**: A robust Node.js/Express API written in TypeScript, backed by a local SQLite database.
* **☁️ Infrastructure (`infra/bicep/`)**: Azure Resource Manager (Bicep) templates to spin up an Azure Kubernetes Service (AKS) cluster and an Azure Container Registry (ACR).
* **🚢 Kubernetes Deployment (`infra/charts/`)**: Helm charts for deploying the application and the NGINX Ingress Controller.
* **🔄 CI/CD (`.github/workflows/`)**: Automated GitHub Actions pipelines for infrastructure setup and application deployment.

---

## 💻 Running Locally (Development)

To run the application locally:

```bash
cd Devops/todo-app
```

**1. Start the Backend API:**
```bash
cd server
npm install
npm run dev
```
The backend API will run on `http://localhost:4000`.

**2. Start the Frontend:**
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## 🚀 CI/CD & Deployment (Azure AKS)

### Running Workflows from GitHub UI

1. Go to your GitHub repository in your browser.
2. Click on the **Actions** tab.
3. Select the desired workflow from the left sidebar:
   - **`Todo App Infra Shared`**: Shared infrastructure prerequisites.
   - **`Todo App Infra`**: AKS cluster and ACR provisioning.
   - **`Todo App Deployment`**: Build, push Docker images, and deploy Helm release to AKS.
4. Click **Run workflow**, choose the target branch and environment (e.g., `dev` or `prod`), and click the **Run workflow** button.

### What the Pipelines Do

When triggered, the automated pipelines execute the following steps:
1. Provision the Azure Infrastructure (AKS & ACR) using **Bicep**.
2. Build and push the frontend and backend Docker images to ACR.
3. Install the **NGINX Ingress Controller** into the cluster (configured with TCP health probes for Azure Load Balancer compatibility).
4. Deploy the application using **Helm** with environment-specific values (`values-dev.yaml` and `values-prod.yaml`).

---

## 🧪 Testing the Deployed Application

Because the Kubernetes deployment uses **Host-based Ingress Routing**, navigating directly to the Azure Load Balancer's public IP address will return a `404 Not Found`. The Ingress Controller (NGINX) needs a valid `Host` header (e.g., `www.todo-app.lat`) to route the traffic to the correct application.

If you have deployed the application to AKS and want to test it using the public IP provided by Azure, you have two options:

### 1. Command Line Test (cURL)
You can inject the required `Host` header directly in your terminal request. Replace `<YOUR_AZURE_IP>` with the external IP of your ingress controller.

**For the Dev Environment:**
```bash
curl -H "Host: www.todo-app.lat" http://<YOUR_AZURE_IP>/
```
**For the Prod Environment:**
```bash
curl -H "Host: todo-app.com" http://<YOUR_AZURE_IP>/
```

### 2. Browser Test (Modifying `/etc/hosts`)
To test the full user interface in your web browser, you can trick your computer into mapping the domain name to your Azure IP address.

1. Open your computer's host resolution file:
   * **Windows:** Open Notepad as Administrator and edit `C:\Windows\System32\drivers\etc\hosts`
   * **macOS / Linux:** Run `sudo nano /etc/hosts` in the terminal
2. Add a new line at the bottom matching your environment:
   ```text
   <YOUR_AZURE_IP>  www.todo-app.lat
   ```
3. Save the file.
4. Open your browser and navigate to: [http://www.todo-app.lat](http://www.todo-app.lat)

---

## 🛠 Prerequisites for Cloud Deployment

To deploy this project to your Azure subscription via GitHub Actions, you will need:
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed and authenticated.
- A GitHub repository with **Repository Secrets** configured for OIDC authentication:
  - `AZURE_CLIENT_ID`: The App Registration Client ID configured with Federated Credentials.
  - `AZURE_TENANT_ID`: Your Azure Active Directory Tenant ID.
  - `AZURE_SUBSCRIPTION_ID`: Your Azure Subscription ID.
- Setup Azure Federated Credentials pointing to your GitHub repository and branch/environment.
