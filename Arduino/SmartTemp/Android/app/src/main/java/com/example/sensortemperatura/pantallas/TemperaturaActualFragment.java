package com.example.sensortemperatura.pantallas;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Vibrator;
import android.preference.Preference;
import android.preference.PreferenceManager;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.sensortemperatura.R;
import com.example.sensortemperatura.librerias.ShakeListener;
import com.github.nkzawa.socketio.client.Socket;
import com.github.nkzawa.emitter.Emitter;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Manfred on 18/06/2016.
 */
public class TemperaturaActualFragment extends Fragment {

    private static ShakeListener sShakeListener;
    private static Vibrator sVibrator;
    private static Socket sSocket;
    private TextView temperatura;
    private SharedPreferences prefs;

    public TemperaturaActualFragment() {
    }

    public static TemperaturaActualFragment newInstance(Vibrator vibrator, Socket socket) {
        TemperaturaActualFragment fragment = new TemperaturaActualFragment();
        sVibrator = vibrator;
        sSocket = socket;
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_temperatura_actual, container, false);

        temperatura = (TextView) rootView.findViewById(R.id.temperatura);

        if (!sSocket.hasListeners("medirTemperaturasApp")) {
            sSocket.emit("medirTemperaturasApp");
            sSocket.on("medirTemperaturasApp", onNuevasTemperaturas);
        }

        if (!sSocket.hasListeners("getLedStateApp")) {
            sSocket.emit("getLedStateApp");
            sSocket.on("getLedStateApp", onNuevoEstadoLed);
        }

        if(sShakeListener == null) {
            sShakeListener = new ShakeListener(getContext());
            sShakeListener.setOnShakeListener(new ShakeListener.OnShakeListener() {
                public void onShake() {
                    actualizarTemperatura();
                }
            });
        }

        prefs = PreferenceManager.getDefaultSharedPreferences(getContext());

        return rootView;
    }

    private void actualizarTemperatura(){
        if (sSocket.connected()){
            sSocket.emit("medirTemperaturasApp");
            sVibrator.vibrate(MainTabbedActivity.VIBRATE_LONG);
            Toast.makeText(getActivity(), "Temperatura Actualizada.", Toast.LENGTH_SHORT).show();
        }else {
            Toast.makeText(getActivity(), "No se pudo conectar", Toast.LENGTH_SHORT).show();
        }

    }

    private Emitter.Listener onNuevasTemperaturas = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {

                        JSONObject data = (JSONObject) args[0];

                        String temperaturaLimite = data.getString("tempLimite");
                        String temperaturaActual = data.getString("tempActual");

                        Log.i("SOCKET TEMPERATURAS", "nuevo mensaje recibido: Actual: " + temperaturaActual + ", Limite: " + temperaturaLimite);

                        EstablecerTempMaxFragment.setTemperaturaLimite(temperaturaLimite);
                        temperatura.setText(temperaturaActual);
                    } catch (JSONException e) {
                        Log.i("SOCKET ACTUAL", "error en los datos recibidos");
                    }catch (Exception e){
                        Log.i("SOCKET ACTUAL", e.getMessage());
                    }
                }
            });
        }
    };

    private Emitter.Listener onNuevoEstadoLed = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            try {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {

                            JSONObject data = (JSONObject) args[0];

                            boolean encendido = data.getBoolean("encendido");
                            Log.i("SOCKET LED", "nuevo mensaje recibido: " + encendido);
                            if (encendido) {
                                LedFragment.setsEstadoLed("ON");
                            } else {
                                LedFragment.setsEstadoLed("OFF");
                            }

                        } catch (JSONException e) {
                            Log.i("SOCKET LED", "error en los datos recibidos");
                        } catch (Exception e) {
                            Log.i("SOCKET LED", e.getMessage());
                        }
                    }
                });
            } catch (Exception e) {
                Log.i("SOCKET LED", e.getMessage());
            }
        }
    };

    @Override
    public void onResume() {
        super.onResume();
        sShakeListener.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        sShakeListener.onPause();
    }

}