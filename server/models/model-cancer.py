import pandas as pd
import pickle
from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns


# Load data from URL
url = "https://raw.githubusercontent.com/AlexandriaSea/DiseaseDataset/main/The_Cancer_data_1500_V2.csv"
data = pd.read_csv(url)

# Handle missing values by filling with mode (categorical) and median (numerical)
for column in data.columns:
    if data[column].dtype == 'object':
        data[column].fillna(data[column].mode()[0], inplace=True)
    else:
        data[column].fillna(data[column].median(), inplace=True)

# Separate features (X) and target (y)
target_column = 'Diagnosis'
X = data.drop(columns=[target_column])
y = data[target_column]

# Encode categorical columns in X
label_encoders = {}
for column in X.columns:
    if X[column].dtype == 'object':
        le = LabelEncoder()
        X[column] = le.fit_transform(X[column])
        label_encoders[column] = le

# Apply SMOTE to balance the dataset
smote = SMOTE(random_state=42, k_neighbors=1)
X_smote, y_smote = smote.fit_resample(X, y)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_smote, y_smote, test_size=0.2, random_state=42)

# Feature Importance Analysis using RandomForest
feature_selector = RandomForestClassifier(random_state=42)
feature_selector.fit(X_train, y_train)
feature_importances = pd.Series(feature_selector.feature_importances_, index=X.columns).sort_values(ascending=False)
top_features = feature_importances.nlargest(10).index.tolist()  # Select top 10 features

# Update X to use only the top important features
X_train = X_train[top_features]
X_test = X_test[top_features]

# Hyperparameter Tuning with GridSearchCV
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}
grid_search = GridSearchCV(estimator=RandomForestClassifier(random_state=42), param_grid=param_grid, cv=5, scoring='f1', n_jobs=-1)
grid_search.fit(X_train, y_train)

# Use best estimator from grid search
model = grid_search.best_estimator_
print(f"Best parameters from GridSearch: {grid_search.best_params_}")

# Train the model with best parameters
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy:.2f}")

# Classification report
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Confusion matrix visualization
conf_matrix = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Reds')
plt.title("Confusion Matrix")
plt.xlabel("Predicted Label (0: No Cancer, 1: Cancer)")
plt.ylabel("True Label (0: No Cancer, 1: Cancer)")
plt.savefig('plot/confusion_matrix_cancer.png')
plt.show()

# Save the model and encoders
with open("pkl/trained_model_cancer.pkl", "wb") as f:
    pickle.dump(model, f)
with open("pkl/feature_encoders_cancer.pkl", "wb") as f:
    pickle.dump(label_encoders, f)
with open("pkl/top_features_cancer.pkl", "wb") as f:
    pickle.dump(top_features, f)

print("Model and encoders saved in 'pkl' folder")