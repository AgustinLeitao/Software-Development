package com.example.sensortemperatura.pantallas;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.example.sensortemperatura.R;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;
import org.json.JSONException;
import org.json.JSONObject;
import cz.msebera.android.httpclient.Header;

public class RegisterActivity extends AppCompatActivity {

    private EditText usuario;
    private EditText password;
    private EditText password2;
    private Button cancelar;
    private Button registrar;
    private final static String URL_HOST = "http://soa.pe.hu/register/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        usuario = (EditText) findViewById(R.id.usuario_tf);
        password = (EditText) findViewById(R.id.password_tf);
        password2 = (EditText) findViewById(R.id.password2_tf);
        cancelar = (Button) findViewById(R.id.cancelar_btn);
        registrar = (Button) findViewById(R.id.registrar_btn);

        cancelar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        registrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(usuario.getText().toString().trim().isEmpty() || password.getText().toString().isEmpty() ||
                        password2.getText().toString().isEmpty()){
                    Toast.makeText(getApplicationContext(), "Complete todos los campos.", Toast.LENGTH_SHORT).show();
                }
                else if(!password.getText().toString().equals(password2.getText().toString())){
                    Toast.makeText(getApplicationContext(), "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show();
                    password.setText("");
                    password2.setText("");
                    password.requestFocus();
                }
                registrarNuevoUsuario(usuario.getText().toString(), password.getText().toString());
            }
        });

    }

    private void registrarNuevoUsuario(String usuario, String password){
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
                        if (response.getBoolean("usuarioCreado")){
                            Toast.makeText(getApplicationContext(), "Nuevo usuario creado!", Toast.LENGTH_SHORT).show();
                            finish();
                        } else {
                            Toast.makeText(getApplicationContext(), "El nombre de usuario ya existe.", Toast.LENGTH_SHORT).show();
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
