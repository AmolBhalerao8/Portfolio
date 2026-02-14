"""
FastAPI Backend for ML Portfolio Demos
======================================
This backend provides inference endpoints for CV and VLM demos.

Endpoints:
- GET /health - Health check
- POST /infer - REST inference endpoint
- WS /ws/infer - WebSocket for real-time inference

Setup:
1. pip install -r requirements.txt
2. uvicorn main:app --reload --port 8000

For production:
- Use gunicorn with uvicorn workers
- Enable HTTPS
- Set up proper CORS origins
"""

import asyncio
import json
import logging
from typing import Optional
from contextlib import asynccontextmanager

import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================
# ONNX Model Loading (Stub - Replace with actual models)
# ============================================

class ModelManager:
    """Manages ONNX model loading and inference."""
    
    def __init__(self):
        self.models = {}
        self.loaded = False
    
    def load_models(self):
        """Load ONNX models. Replace with actual model loading."""
        try:
            # Example: Load ONNX models
            # import onnxruntime as ort
            # self.models['detector'] = ort.InferenceSession('models/detector.onnx')
            # self.models['vlm'] = ort.InferenceSession('models/vlm.onnx')
            
            logger.info("Models loaded successfully (stub)")
            self.loaded = True
        except Exception as e:
            logger.error(f"Failed to load models: {e}")
            self.loaded = False
    
    def predict_detection(self, image_data: np.ndarray) -> dict:
        """Run object detection inference."""
        # Stub implementation - replace with actual inference
        # Example with ONNX:
        # inputs = {'input': image_data}
        # outputs = self.models['detector'].run(None, inputs)
        
        return {
            "detections": [
                {"class": "person", "confidence": 0.95, "bbox": [100, 100, 200, 300]},
                {"class": "laptop", "confidence": 0.87, "bbox": [250, 150, 400, 280]},
            ],
            "inference_time_ms": 25.3
        }
    
    def predict_vlm(self, image_data: np.ndarray, query: str) -> dict:
        """Run VLM inference."""
        # Stub implementation - replace with actual inference
        return {
            "caption": f"This image shows a scene. Query: {query}",
            "attention_map": [[0.1, 0.2], [0.3, 0.4]],  # Simplified
            "inference_time_ms": 150.2
        }

# Global model manager
model_manager = ModelManager()

# ============================================
# Lifespan Context Manager
# ============================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load models on startup, cleanup on shutdown."""
    logger.info("Starting up - loading models...")
    model_manager.load_models()
    yield
    logger.info("Shutting down...")

# ============================================
# FastAPI App
# ============================================

app = FastAPI(
    title="ML Portfolio Demo API",
    description="Backend API for CV and VLM demos",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
# In production, replace with your actual frontend domain
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-portfolio-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# Request/Response Models
# ============================================

class InferenceRequest(BaseModel):
    model_type: str  # 'detection' or 'vlm'
    query: Optional[str] = None  # For VLM
    image_base64: Optional[str] = None

class InferenceResponse(BaseModel):
    success: bool
    data: dict
    inference_time_ms: float

class HealthResponse(BaseModel):
    status: str
    models_loaded: bool
    version: str

# ============================================
# REST Endpoints
# ============================================

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        models_loaded=model_manager.loaded,
        version="1.0.0"
    )

@app.post("/infer", response_model=InferenceResponse)
async def infer(request: InferenceRequest):
    """
    REST inference endpoint.
    
    Supports:
    - Object detection: model_type='detection'
    - VLM: model_type='vlm', requires query parameter
    """
    if not model_manager.loaded:
        raise HTTPException(status_code=503, detail="Models not loaded")
    
    try:
        # Decode image (stub - replace with actual decoding)
        # import base64
        # image_bytes = base64.b64decode(request.image_base64)
        # image = decode_image(image_bytes)
        image = np.zeros((224, 224, 3))  # Placeholder
        
        if request.model_type == "detection":
            result = model_manager.predict_detection(image)
        elif request.model_type == "vlm":
            if not request.query:
                raise HTTPException(status_code=400, detail="Query required for VLM")
            result = model_manager.predict_vlm(image, request.query)
        else:
            raise HTTPException(status_code=400, detail=f"Unknown model type: {request.model_type}")
        
        return InferenceResponse(
            success=True,
            data=result,
            inference_time_ms=result.get("inference_time_ms", 0)
        )
    
    except Exception as e:
        logger.error(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/infer/upload")
async def infer_upload(
    file: UploadFile = File(...),
    model_type: str = "detection",
    query: Optional[str] = None
):
    """
    Inference endpoint with file upload.
    Useful for larger images or when base64 encoding is not preferred.
    """
    if not model_manager.loaded:
        raise HTTPException(status_code=503, detail="Models not loaded")
    
    try:
        contents = await file.read()
        # Decode image (stub)
        # image = decode_image(contents)
        image = np.zeros((224, 224, 3))  # Placeholder
        
        if model_type == "detection":
            result = model_manager.predict_detection(image)
        elif model_type == "vlm":
            if not query:
                raise HTTPException(status_code=400, detail="Query required for VLM")
            result = model_manager.predict_vlm(image, query)
        else:
            raise HTTPException(status_code=400, detail=f"Unknown model type: {model_type}")
        
        return {
            "success": True,
            "data": result,
            "inference_time_ms": result.get("inference_time_ms", 0)
        }
    
    except Exception as e:
        logger.error(f"Upload inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# WebSocket Endpoint for Real-time Inference
# ============================================

@app.websocket("/ws/infer")
async def websocket_infer(websocket: WebSocket):
    """
    WebSocket endpoint for real-time inference.
    
    Protocol:
    1. Client connects
    2. Client sends JSON: {"type": "detection" | "vlm", "image": base64, "query": "..."}
    3. Server responds with inference results
    4. Repeat until disconnect
    """
    await websocket.accept()
    logger.info("WebSocket client connected")
    
    try:
        while True:
            # Receive message
            data = await websocket.receive_text()
            message = json.loads(data)
            
            model_type = message.get("type", "detection")
            query = message.get("query", "")
            
            # Decode image (stub)
            image = np.zeros((224, 224, 3))  # Placeholder
            
            # Run inference
            if model_type == "detection":
                result = model_manager.predict_detection(image)
            elif model_type == "vlm":
                result = model_manager.predict_vlm(image, query)
            else:
                result = {"error": f"Unknown model type: {model_type}"}
            
            # Send response
            await websocket.send_json({
                "success": True,
                "data": result,
                "timestamp": asyncio.get_event_loop().time()
            })
    
    except WebSocketDisconnect:
        logger.info("WebSocket client disconnected")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close(code=1011, reason=str(e))

# ============================================
# Run with: uvicorn main:app --reload --port 8000
# ============================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
