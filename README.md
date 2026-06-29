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
2.  **TypeScript Component Framework (PCF):** The UI views can seamlessly swap standard controls for specialized UI components built using custom script frameworks.
