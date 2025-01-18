from google.cloud import vision
from google.oauth2 import service_account
import io
import numpy as np
from typing import Tuple, List, Dict
import os

class VisionService:
    def __init__(self, credentials_path=None):
        try:
            if credentials_path and os.path.exists(credentials_path):
                credentials = service_account.Credentials.from_service_account_file(
                    credentials_path,
                    scopes=['https://www.googleapis.com/auth/cloud-platform']
                )
                self.client = vision.ImageAnnotatorClient(credentials=credentials)
            else:
                self.client = vision.ImageAnnotatorClient()
                

            self.style_categories = {
                'formal': ['suit', 'dress', 'tuxedo', 'gown', 'formal wear', 'blazer'],
                'casual': ['t-shirt', 'jeans', 'sneakers', 'sweater', 'casual wear'],
                'sporty': ['athletic wear', 'sportswear', 'leggings', 'running shoes', 'jogging'],
                'trendy': ['fashion', 'stylish', 'designer', 'luxury', 'runway', 'fashionista'],
                'accessories': ['hat', 'scarf', 'glasses', 'belt', 'bag']
            }

        except Exception as e:
            raise Exception(f"Failed to initialize Vision Service: {str(e)}")

    def analyze_outfit(self, image_file) -> Tuple[int, str, Dict]:
        """Analyze outfit and return score, classification and details"""
        # Convert image to bytes
        image_content = image_file.read()
        image = vision.Image(content=image_content)

        # Perform multiple types of detection
        label_detection = self.client.label_detection(image=image)
        object_detection = self.client.object_localization(image=image)
        print("Labels detected:", label_detection.label_annotations)
        print("Objects detected:", object_detection.localized_object_annotations)
        image_properties = self.client.image_properties(image=image)

        # Analyze results
        labels = [label.description.lower() for label in label_detection.label_annotations]
        objects = [obj.name.lower() for obj in object_detection.localized_object_annotations]
        colors = self._analyze_colors(image_properties.image_properties_annotation)

        # Apply a confidence threshold
        relevant_labels = [label for label in label_detection.label_annotations if label.score > 0.6]
        if len(relevant_labels) == 0:
            return 30, 'bad', {"message": "Unable to detect fashion-related items with confidence."}

        
        # Calculate scores
        style_score = self._calculate_style_score(labels, objects)
        color_score = self._calculate_color_harmony(colors)
        outfit_score = self._calculate_outfit_completeness(objects)

        # Calculate final score
        final_score = int((style_score + color_score + outfit_score) / 3)
        
        # Determine classification
        classification = 'good' if final_score >= 70 else 'bad'

        details = {
            'style_score': style_score,
            'color_score': color_score,
            'outfit_score': outfit_score,
            'detected_items': objects,
            'style_labels': labels[:5],
            'dominant_colors': colors[:3]
        }

        return final_score, classification, details

    def _analyze_colors(self, properties) -> List[Dict]:
        colors = []
        for color in properties.dominant_colors.colors:
            colors.append({
                'rgb': [color.color.red, color.color.green, color.color.blue],
                'score': color.score,
                'pixel_fraction': color.pixel_fraction
            })
        return colors

    def _calculate_style_score(self, labels: List[str], objects: List[str]) -> int:
        score = 70  # Base score

        if not self._is_fashion_related(labels, objects):
            score -= 50  # Deduct a significant amount for non-fashion-related content

        # Check style consistency
        style_matches = {
            category: sum(1 for item in labels if item in items)
            for category, items in self.style_categories.items()
        }
        
        # Reward consistent style
        if any(matches >= 2 for matches in style_matches.values()):
            score += 15
        
        # Check for fashion-forward items
        trendy_items = sum(1 for label in labels 
                         if label in self.style_categories['trendy'])
        score += min(trendy_items * 5, 15)

        return min(100, max(0, score))

    def _calculate_color_harmony(self, colors: List[Dict]) -> int:
        if len(colors) < 2:
            return 70

        score = 70
        main_colors = colors[:3]

        # Check color distribution
        distribution = sum(color['pixel_fraction'] for color in main_colors)
        if 0.6 <= distribution <= 0.9:
            score += 15

        # Check color contrast
        for i in range(len(main_colors) - 1):
            contrast = self._calculate_contrast(
                main_colors[i]['rgb'],
                main_colors[i + 1]['rgb']
            )
            if 0.3 <= contrast <= 0.7:
                score += 5

        return min(100, score)

    def _calculate_contrast(self, color1: List[int], color2: List[int]) -> float:
        return np.sqrt(sum((c1 - c2) ** 2 for c1, c2 in zip(color1, color2))) / 441.67

    def _calculate_outfit_completeness(self, objects: List[str]) -> int:
        score = 60  # Base score

        # Define categories more rigorously
        essential_items = {
            'top': ['shirt', 'blouse', 't-shirt', 'sweater', 'jacket'],
            'bottom': ['pants', 'skirt', 'shorts', 'jeans'],
            'shoes': ['shoes', 'sneakers', 'boots', 'sandals'],
            'accessories': ['bag', 'watch', 'jewelry', 'belt'],
            'outerwear': ['coat', 'jacket', 'blazer']
        }
        
        detected_categories = set()
        for obj in objects:
            for category, items in essential_items.items():
                if obj in items and category not in detected_categories:
                    detected_categories.add(category)
                    score += 10

        # Penalize incomplete outfits
        if len(detected_categories) < 3:
            score -= 20  # Reduce score for incomplete outfits

        return min(100, score)

    
    
    def _is_fashion_related(self, labels: List[str], objects: List[str]) -> bool:
        # Define fashion-related keywords
        fashion_keywords = {"shirt", "dress", "pants", "shoes", "fashion", "style", "footwear"}
        labels_set = set(labels)
        objects_set = set(objects)
        return bool(fashion_keywords & labels_set or fashion_keywords & objects_set)

     

