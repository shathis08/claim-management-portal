## 💡 Project Purpose & Learning Journey

This repository was created as a hands-on project to learn, test, and deeply understand the advanced developer capabilities of the **Microsoft Power Platform**. 

The main goals of this project were to:
* **Master PCF Components:** Gain practical experience building custom user interfaces from scratch using TypeScript and the Power Apps Component Framework (PCF).
* **Understand C# Plugins:** Explore the Dataverse event execution pipeline by writing server-side logic in C# to enforce strict data integrity behind the scenes.
* **Bridge Front-End & Back-End:** Test my full-stack understanding of how custom UI controls interact seamlessly with core database security layers in a real Power Platform environment.

This project serves as a personal milestone in mastering the true pro-code level development on the Power Platform!

# Insurance Claim Assessor & Automation Portal

A simple insurance claim routing and orchestration system built on the Microsoft Power Platform. This architecture simulates high-volume medical insurance operations by applying automated thresholds to incoming triage requests.

## 🛠️ System Architecture

*   **Data Layer (Microsoft Dataverse):** Built using a relational data model centered around a core Insurance claim entity. Includes typed currency handling (`Claim Amount`), scalable status control states, and strict text formatting for assessor audit logs.
*   **UI Layer (Model-Driven Architecture):** Implemented via a back-office Model-Driven Portal. Unlike Canvas apps, this design prioritizes data density, view-filtering parameters, and high-efficiency subgrid interfaces necessary for enterprise claims adjusters.
*   **Automation Layer (Power Automate):** Backed by an asynchronous event-driven Cloud Flow triggered instantly upon Dataverse data injection (`Row Added`). 

## 🧠 Business Logic & Flow Parameters
The cloud flow acts as an automated triage gate based on operational thresholds:
*   **Condition:** Evaluates incoming `Claim Amount` against a baseline threshold of **RM 10,000**.
*   **High-Value Branch (True):** Automatically flags status to `Under Review` and routes an asynchronous alert notification.
*   **Standard Branch (False):** Auto-approves the claim record instantly and writes a system audit stamp directly to the Dataverse schema.

## 💻 Pro-Code Extensibility Profile
Leveraging my background in **.NET, C#, and Angular**, this entire architecture is structured to support enterprise-tier scale-out hooks:
1.  **C# Plugins:** The Dataverse tables are cleanly mapped to allow execution of custom `.NET` class libraries directly on the pre/post-operation transactional pipelines.
   - Added a plugin where it validates the claim amount is not less than 0 or negative value, using PreValidate Operation
2.  **TypeScript Component Framework (PCF):** The UI views can seamlessly swap standard controls for specialized UI components built using custom script frameworks.
   - Added a slider component for users to slide the claim amount value as a alternate way from keyboard input.
