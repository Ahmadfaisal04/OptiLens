# OptiLens Architecture

## Overview
OptiLens is a mobile application that combines machine learning, cloud computing, and mobile development to deliver an accessible solution for eye health management. The architecture is designed to handle real-time cataract detection and refractive error assessment while ensuring scalability, efficiency, and a seamless user experience.

---

## **System Components**

### 1. **Machine Learning (ML)**
- **Purpose**: To build and train the models for cataract detection and refractive error classification.
- **Key Features**:
  - CNN-based architecture for image classification.
  - TensorFlow and Keras as primary frameworks.
  - TensorFlow Lite conversion for mobile deployment.
- **Output**:
  - Pre-trained models stored as `.h5` and `.tflite` formats for deployment.

---

### 2. **Cloud Computing (CC)**
- **Purpose**: To support backend operations and enable secure, scalable data storage and processing.
- **Infrastructure**:
  - **Google Cloud Platform (GCP)** for hosting and database management.
  - **Cloud Storage**: Stores datasets and ML models.
  - **App Engine**: Hosts the backend API.
  - **PostgreSQL Database**: Stores user information and test results securely.
- **Features**:
  - Backend API for interaction between the app and ML model.
  - Docker for containerized deployments.

---

### 3. **Mobile Development (MD)**
- **Purpose**: To create the user-facing application.
- **Key Features**:
  - Developed in Kotlin using Android Studio.
  - Intuitive UI/UX for seamless interaction.
  - Integration with TensorFlow Lite for on-device inference.
  - Snellen chart for manual refractive error assessment.
- **Functionality**:
  - Real-time image capture for cataract detection.
  - Display of results with actionable recommendations.

---

## **System Workflow**

1. **Data Flow**:
   - User captures or uploads an image via the app.
   - Image is preprocessed and fed to the ML model.
   - Model predicts the condition (Normal, Immature, Mature).
   - Results are displayed on the app with recommendations.

2. **Backend Interaction**:
   - Results and user data are securely sent to the cloud for storage.
   - APIs facilitate communication between app and cloud services.

3. **Deployment**:
   - ML models are deployed as TensorFlow Lite for mobile inference.
   - Cloud backend handles additional processing and data persistence.

---

## **Architecture Diagram**
- **Frontend**: Mobile application for user interaction.
- **Backend**: Cloud-hosted API for data processing.
- **ML Model**: TensorFlow Lite model embedded in the app.
- **Database**: Cloud-based storage for results and user data.

```plaintext
[Mobile App] <--> [Cloud API] <--> [Database]
                  |
            [ML Model (TFLite)]
```

---

## **Technologies Used**
- **Machine Learning**: TensorFlow, Keras, TensorFlow Lite.
- **Cloud Computing**: Google Cloud Platform, Docker, PostgreSQL.
- **Mobile Development**: Android Studio, Kotlin, Figma (for UI design).

---

## Future Enhancements
1. Support for additional eye conditions.
2. Integration with wearables for continuous monitoring.
3. Enhanced cloud-based analytics for medical professionals.


