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
* **🔄 CI/CD (`.github/workflows/`)**: Automated GitHub Actions pipelines at the root of the repository.

---

## 💻 Running Locally (Development)

To run the application locally, first navigate to the project directory:

```bash
cd Devops/todo-app
```

Then follow the steps below.

**1. Start the Backend API:**
```bash
cd server
npm install
npm run dev
```

**2. Start the Frontend:**
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```

---

## 🚀 CI/CD & Deployment (Azure AKS)

This project includes a fully automated deployment pipeline located at the root of the repository: `.github/workflows`. 

When the workflows are triggered, the pipelines will:
1. Provision the Azure Infrastructure (AKS & ACR) using **Bicep**.
2. Build and push the frontend and backend Docker images to ACR.
3. Install the **NGINX Ingress Controller** into the cluster (configured with TCP health probes for Azure Load Balancer compatibility).
4. Deploy the application using **Helm**.

The Helm charts are configured with environment-specific values (`values-dev.yaml` and `values-prod.yaml`).

---

## 🧪 Testing the Deployed Application

Because the Kubernetes deployment uses **Host-based Ingress Routing**, navigating directly to the Azure Load Balancer's public IP address will return a `404 Not Found`. The Ingress Controller (NGINX) needs a valid `Host` header (e.g., `todo-app-dev.com`) to route the traffic to the correct application.

If you have deployed the application to AKS and want to test it using the public IP provided by Azure, you have two options:

### 1. Command Line Test (cURL)
You can inject the required `Host` header directly in your terminal request. Replace `<YOUR_AZURE_IP>` with the external IP of your ingress controller.

**For the Dev Environment:**
```bash
curl -H "Host: todo-app-dev.com" http://<YOUR_AZURE_IP>/
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
   <YOUR_AZURE_IP>  todo-app-dev.com
   ```
3. Save the file.
4. Open your browser and navigate to: [http://todo-app-dev.com](http://todo-app-dev.com)

---

## 🛠 Prerequisites for Cloud Deployment

To deploy this project to your Azure subscription via GitHub Actions, you will need:
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed and authenticated.
- A GitHub repository with **Repository Secrets** configured for OIDC authentication:
  - `AZURE_CLIENT_ID`: The App Registration Client ID configured with Federated Credentials.
  - `AZURE_TENANT_ID`: Your Azure Active Directory Tenant ID.
  - `AZURE_SUBSCRIPTION_ID`: Your Azure Subscription ID.
- Setup Azure Federated Credentials pointing to your GitHub repository and branch/environment.
