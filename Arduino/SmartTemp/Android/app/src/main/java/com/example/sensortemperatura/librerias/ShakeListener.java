package com.example.sensortemperatura.librerias;
import java.util.List;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

public class ShakeListener implements SensorEventListener {

    private SensorManager mSensorManager;
    private OnShakeListener mListener;
    private long mPreTime;
    private float mLastX;
    private float mLastY;
    private float mLastZ;
    private int mShakeCount;

    public interface OnShakeListener {
        void onShake();
    }

    public void setOnShakeListener(OnShakeListener listener) {
        mListener = listener;
    }

    public ShakeListener(Context context) {
        mSensorManager = (SensorManager)context.getSystemService(
                Context.SENSOR_SERVICE);
    }

    public void onResume() {
        List<Sensor> list =
                mSensorManager.getSensorList(Sensor.TYPE_ACCELEROMETER);

        if (list.size() < 1) return;

        mSensorManager.registerListener(this,
                list.get(0),
                SensorManager.SENSOR_DELAY_UI);
    }

    public void onPause() {
        mSensorManager.unregisterListener(this);
    }

    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }

    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() != Sensor.TYPE_ACCELEROMETER) {
            return;
        }

        long curTime = System.currentTimeMillis();
        long diffTime = curTime - mPreTime;
        if (diffTime > 100) {
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];
            float speed = Math.abs(x+y+z - mLastX-mLastY-mLastZ)
                    / diffTime * 10000;
            if (speed > 300) {
                mShakeCount++;
                if (mShakeCount > 4) {
                    mShakeCount = 0;
                    if (mListener != null) {
                        mListener.onShake();
                    }
                }
            } else {
                mShakeCount = 0;
            }
            mPreTime = curTime;
            mLastX = x;
            mLastY = y;
            mLastZ = z;
        }
    }
}