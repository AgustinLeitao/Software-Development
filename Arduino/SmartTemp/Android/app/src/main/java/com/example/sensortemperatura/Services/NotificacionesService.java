package com.example.sensortemperatura.Services;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;

public class NotificacionesService extends Service {

    private Context mContext;

    public NotificacionesService(){

    }

    public NotificacionesService(Context context) {
        super();
        this.mContext = context;

    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
