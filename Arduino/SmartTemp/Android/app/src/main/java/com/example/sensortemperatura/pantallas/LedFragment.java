package com.example.sensortemperatura.pantallas;

import android.os.Bundle;
import android.os.Vibrator;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.sensortemperatura.R;
import com.example.sensortemperatura.librerias.ProximityListener;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Manfred on 18/06/2016.
 */
public class LedFragment extends Fragment {

    private static ProximityListener sProximitySensor;
    private static Vibrator sVibrator;
    private static Socket sSocket;
    private static String sEstadoLed;
    private static TextView estadoLed_tv;
    private Integer contador = 0;

    public LedFragment() {
    }

    /**
     * Returns a new instance of this fragment for the given section
     * number.
     */
    public static LedFragment newInstance(Vibrator vibrator, Socket socket) {
        LedFragment fragment = new LedFragment();
        sVibrator = vibrator;
        sSocket = socket;

        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_led, container, false);
        estadoLed_tv = (TextView) rootView.findViewById(R.id.estadoLED);
        estadoLed_tv.setText(sEstadoLed);

        if (sProximitySensor == null) {
            sProximitySensor = new ProximityListener(getContext());
            sProximitySensor.setOnProximityListener(new ProximityListener.OnProximityListener() {
                public void onProximity() {
                    if (MainTabbedActivity.USER_ID.equals("admin") || MainTabbedActivity.USER_ID.equals("root"))
                        actualizarEstadoLed();
                }
            });
        }

        return rootView;
    }

    private void actualizarEstadoLed() {
        contador++;
        if (contador > 1){
            if (sSocket.connected()) {
                JSONObject obj = new JSONObject();
                try {
                    if (estadoLed_tv.getText().equals("ON"))
                        obj.put("encendido", false);
                    else
                        obj.put("encendido", true);

                    sSocket.emit("setLedState", obj);
                    sSocket.emit("getLedStateApp");
                    sVibrator.vibrate(MainTabbedActivity.VIBRATE_LONG);

                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    Log.i("SOCKET LED", e.getMessage());
                }

            }else
                Toast.makeText(getContext(), "No se pudo conectar", Toast.LENGTH_SHORT).show();

            contador = 0;
        }
    }

    /**
     * En un fragment los metodos onResume y onPause son llamados cuando la Activity que los
     * contiene llama a los mismos, es decir, estan vinculados.
     */

    @Override
    public void onResume() {
        super.onResume();
        sProximitySensor.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        sProximitySensor.onPause();
    }

    public static void setsEstadoLed(String estado){
        sEstadoLed = estado;
        estadoLed_tv.setText(estado);
    }
}