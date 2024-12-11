package com.example.optilens.helper

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import android.widget.Toast
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer
import java.io.FileInputStream
import java.nio.ByteBuffer
import java.nio.channels.FileChannel
import java.nio.ByteOrder

class ImageDetectionHelper(private val context: Context, private val modelFileName: String) {

    private lateinit var tfliteInterpreter: Interpreter

    init {
        try {
            loadModel()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    // Load the TensorFlow Lite model
    private fun loadModel() {
        try {
            val assetFileDescriptor = context.assets.openFd(modelFileName)
            val inputStream = FileInputStream(assetFileDescriptor.fileDescriptor)
            val fileChannel = inputStream.channel
            val startOffset = assetFileDescriptor.startOffset
            val declaredLength = assetFileDescriptor.declaredLength
            val modelBuffer = fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength)

            // Load model into the interpreter
            tfliteInterpreter = Interpreter(modelBuffer)
            Toast.makeText(context, "Model loaded successfully", Toast.LENGTH_SHORT).show()

        } catch (e: Exception) {
            Toast.makeText(context, "Model loading failed: ${e.message}", Toast.LENGTH_LONG).show()
            Log.e("ImageDetectionHelper", "Model loading failed: ${e.message}")
        }
    }


    // Preprocess the image to fit model's input size (224x224x3) and return ByteBuffer
    private fun preprocessImage(bitmap: Bitmap, imageSize: Int): ByteBuffer {
        val imageSize = 128 // model input size (128x128x3)
        val byteBuffer = ByteBuffer.allocateDirect(4 * imageSize * imageSize * 3)
        byteBuffer.order(ByteOrder.nativeOrder())

        // Convert Bitmap to ByteBuffer
        val buffer = ByteBuffer.allocate(imageSize * imageSize * 3 * 4)
        val intValues = IntArray(imageSize * imageSize)
        bitmap.getPixels(intValues, 0, bitmap.width, 0, 0, bitmap.width, bitmap.height)

        // Load image data into buffer
        var pixel = 0
        for (i in intValues.indices) {
            val value = intValues[i]
            byteBuffer.putFloat((value shr 16 and 0xFF) / 255.0f)  // Red channel
            byteBuffer.putFloat((value shr 8 and 0xFF) / 255.0f)   // Green channel
            byteBuffer.putFloat((value and 0xFF) / 255.0f)        // Blue channel
        }

        byteBuffer.rewind()
        return byteBuffer
    }

    // Run inference on the preprocessed image and return results
    fun detectImage(bitmap: Bitmap, imageSize: Int): List<Float> {
        val inputBuffer = preprocessImage(bitmap, imageSize)

        // Prepare output buffer to store results (example with 3 output classes)
        val outputBuffer = TensorBuffer.createFixedSize(intArrayOf(1, NUM_CLASSES), org.tensorflow.lite.DataType.FLOAT32)

        // Run inference with the model
        tfliteInterpreter.run(inputBuffer, outputBuffer.buffer.rewind())

        // Return the inference results as a list of floats
        return outputBuffer.floatArray.toList()
    }

    companion object {
        private const val NUM_CLASSES = 3  // Adjust according to your model's output classes
    }

    // Method to close the interpreter and release resources
    fun close() {
        if (::tfliteInterpreter.isInitialized) {
            tfliteInterpreter.close()
        }
    }
}
