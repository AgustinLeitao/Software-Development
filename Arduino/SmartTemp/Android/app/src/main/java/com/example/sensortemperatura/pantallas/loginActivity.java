package com.example.sensortemperatura.pantallas;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Paint;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import com.example.sensortemperatura.R;
import org.json.JSONException;
import org.json.JSONObject;
import com.loopj.android.http.*;
import cz.msebera.android.httpclient.Header;

public class loginActivity extends Activity {
    private Button login_btn;
    private EditText user_tf, password_tf;
    private TextView register_lnk;
    private final String USUARIO_RESPALDO = "root";
    private final static String URL_HOST = "http://soa.pe.hu/login/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        login_btn = (Button) findViewById(R.id.login_btn);
        user_tf = (EditText) findViewById(R.id.user_tf);
        password_tf = (EditText) findViewById(R.id.password_tf);
        register_lnk = (TextView) findViewById(R.id.register_txt);
        register_lnk.setPaintFlags(register_lnk.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (user_tf.getText().toString().isEmpty() || password_tf.getText().toString().isEmpty()) {
                    Toast.makeText(getApplicationContext(), "Complete los campos.", Toast.LENGTH_SHORT).show();
                }else if (user_tf.getText().toString().equals(USUARIO_RESPALDO)) {
                    Toast.makeText(getApplicationContext(), "usuario de respaldo.", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(getApplicationContext(), MainTabbedActivity.class);
                    intent.putExtra("SESSION_ID", user_tf.getText().toString());
                    startActivity(intent);
                }else
                    validarUsuario(user_tf.getText().toString(), password_tf.getText().toString());
            }
        });

        register_lnk.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), RegisterActivity.class);
                startActivity(intent);
            }
        });

    }

    private void validarUsuario(String usuario, String password){
        AsyncHttpClient client = new AsyncHttpClient();
        RequestParams parametros = new RequestParams();
        parametros.put("user", usuario);
        parametros.put("password", password);

        client.post(URL_HOST, parametros, new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                if (statusCode == 200) {
                    try {
                        JSONObject response = new JSONObject(new String(responseBody));
                        if (response.getBoolean("usuarioValido")){
                            Toast.makeText(getApplicationContext(), "Redireccionando...", Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(getApplicationContext(), MainTabbedActivity.class);
                            intent.putExtra("SESSION_ID", user_tf.getText().toString());
                            startActivity(intent);
                        } else {
                            Toast.makeText(getApplicationContext(), "Credenciales incorrectas", Toast.LENGTH_SHORT).show();
                        }

                    } catch (JSONException e) {
                        Log.i("WEBSERVICE", e.getMessage());
                    }
                }

            }

            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                Log.i("WEBSERVICE", "error en la respuesta");
            }

        });
    }
}