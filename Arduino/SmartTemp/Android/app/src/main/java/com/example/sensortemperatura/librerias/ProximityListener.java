package com.example.sensortemperatura.librerias;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import java.util.List;

/**
 * Created by Manfred on 01/07/2016.
 */
public class ProximityListener implements SensorEventListener {
    private SensorManager mSensorManager;
    private OnProximityListener mListener;

    public interface OnProximityListener {
        void onProximity();
    }

    public void setOnProximityListener(OnProximityListener listener) {
        mListener = listener;
    }

    public ProximityListener(Context context) {
        mSensorManager = (SensorManager)context.getSystemService(Context.SENSOR_SERVICE);
    }

    public void onResume() {
        List<Sensor> list =
                mSensorManager.getSensorList(Sensor.TYPE_PROXIMITY);

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
        if (event.sensor.getType() != Sensor.TYPE_PROXIMITY) {
            return;
        }

        if (mListener != null) {
            mListener.onProximity();
        }
    }
}
