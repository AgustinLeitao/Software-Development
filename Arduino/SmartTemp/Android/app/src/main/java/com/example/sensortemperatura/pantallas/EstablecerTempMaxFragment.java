package com.example.sensortemperatura.pantallas;

        import android.content.Intent;
        import android.os.Bundle;
        import android.speech.RecognizerIntent;
        import android.support.v4.app.Fragment;
        import android.util.Log;
        import android.view.LayoutInflater;
        import android.view.View;
        import android.view.ViewGroup;
        import android.widget.Button;
        import android.widget.EditText;
        import android.widget.ImageButton;
        import android.widget.TextView;
        import android.widget.Toast;

        import com.example.sensortemperatura.R;
        import com.github.nkzawa.socketio.client.Socket;

        import org.json.JSONException;
        import org.json.JSONObject;

        import java.util.ArrayList;
        import java.util.Locale;

/**
 * Created by Manfred on 18/06/2016.
 */
public class EstablecerTempMaxFragment extends Fragment {

    private static Socket sSocket;
    private EditText temperatura_tf;
    private TextView temperatura_tv;
    private Button actualizar_btn;
    private ImageButton voz_btn;
    private static TextView tempLimite_tv;
    private static String sTempLimite;

    public EstablecerTempMaxFragment() {
    }

    public static EstablecerTempMaxFragment newInstance(Socket socket) {
        EstablecerTempMaxFragment fragment = new EstablecerTempMaxFragment();
        sSocket = socket;
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container ,Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.fragment_establecer_temperatura, container, false);
        temperatura_tf = (EditText) rootView.findViewById(R.id.nuevaTemperatura_tf);
        actualizar_btn = (Button) rootView.findViewById(R.id.actualizarTemperatura_btn);
        tempLimite_tv = (TextView) rootView.findViewById(R.id.tempMaxActual);
        voz_btn = (ImageButton) rootView.findViewById(R.id.voz_btn);
        temperatura_tv = (TextView) rootView.findViewById(R.id.nuevaTemperatura_tv);
        tempLimite_tv.setText(sTempLimite);

        if (!MainTabbedActivity.USER_ID.equals("admin") && !MainTabbedActivity.USER_ID.equals("root")){
            temperatura_tf.setVisibility(View.INVISIBLE);
            temperatura_tv.setVisibility(View.INVISIBLE);
            actualizar_btn.setVisibility(View.INVISIBLE);
            voz_btn.setVisibility(View.INVISIBLE);
        }

        if (!actualizar_btn.hasOnClickListeners()){
            actualizar_btn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String temp = temperatura_tf.getText().toString();
                    if (!temp.isEmpty())
                        enviarTemperatura(Integer.parseInt(temp));
                    else
                        Toast.makeText(getActivity(), "Debe ingresar una temperatura", Toast.LENGTH_SHORT).show();

                }
            });
        }

        voz_btn.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                // Specify free form input
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                        RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                intent.putExtra(RecognizerIntent.EXTRA_PROMPT,"¿Qué temperatura límite desea?");
                intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "es-ES");
                startActivityForResult(intent, 1);
            }
        });

        return rootView;
    }

    private void enviarTemperatura(int temperatura) {

        if (sSocket.connected()){
            JSONObject obj = new JSONObject();
            try {
                obj.put("tempLimite", temperatura);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            sSocket.emit("setTempLimite", obj);
            sSocket.emit("medirTemperaturasApp");
            temperatura_tf.setText("");
            Toast.makeText(getActivity(), "Temperatura Actualizada!!", Toast.LENGTH_SHORT).show();
        }else {
            Toast.makeText(getActivity(), "No se pudo conectar", Toast.LENGTH_SHORT).show();
        }


    }

    public static void setTemperaturaLimite(String temp){
        sTempLimite = temp;
        tempLimite_tv.setText(temp);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data)
    {

        //this requestCode is for speechRecognizer. Only this part of the code needs to be added for
        //the implementation of voice to text functionality.

        if (requestCode == 1) {
            ArrayList results;
            results = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            //Toast.makeText(this, results.get(0), Toast.LENGTH_SHORT).show();

            //if the name has an ' then the SQL is failing. Hence replacing them.
            String text = results.get(0).toString();
            temperatura_tf.setText(text);
            actualizar_btn.performClick();
        }

    }
}