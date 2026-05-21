package com.example.sensortemperatura.pantallas;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Vibrator;
import android.preference.PreferenceManager;
import android.support.design.widget.TabLayout;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.content.SharedPreferences;
import android.view.View;
import android.widget.TabHost;

import com.example.sensortemperatura.R;
import com.example.sensortemperatura.Services.NotificacionesService;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

public class MainTabbedActivity extends AppCompatActivity {

    private SectionsPagerAdapter mSectionsPagerAdapter;
    private ViewPager mViewPager;
    private Vibrator mVibrator;
    private Socket mSocket;
    private SharedPreferences prefs;
    public static String USER_ID;
    public static final int VIBRATE_LONG = 50;
    private boolean isInFront;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            USER_ID = extras.getString("SESSION_ID");
        }

        SharedPreferences prefe=getSharedPreferences("datos", Context.MODE_PRIVATE);
       // et1.setText(prefe.getString("mail",""));

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_tabbed);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);
        mViewPager.setCurrentItem(1, false);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(mViewPager);


        mVibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

        prefs = PreferenceManager.getDefaultSharedPreferences(this);
        String ip = prefs.getString("direccion_ip", "127.0.0.1");
        String puerto = prefs.getString("puerto", "5000");
        try {
            mSocket = IO.socket("http://" + ip + ":" + puerto);
            mSocket.on("notificacion", onNuevaNotificacion);
            mSocket.connect();
        } catch (URISyntaxException e) {
            Log.i("ERROR SOCKET", e.getMessage());
        }

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main_tabbed, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            Intent intent = new Intent(this, SettingsActivity.class);
            startActivity(intent);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            // getItem is called to instantiate the fragment for the given page.
            // Return a LedFragment (defined as a static inner class below).
            switch(position) {
                case 0:
                    return LedFragment.newInstance(mVibrator,mSocket);
                case 1:
                    return TemperaturaActualFragment.newInstance(mVibrator,mSocket);
                case 2:
                    return EstablecerTempMaxFragment.newInstance(mSocket);
            }
            return null;
        }

        @Override
        public int getCount() {
            // Show 3 total pages.
            return 3;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            switch (position) {
                case 0:
                    return "Led";
                case 1:
                    return "Ahora";
                case 2:
                    return "Limite";
            }
            return null;
        }
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mSocket.off("medirTemperaturasApp");
        mSocket.off("getLedStateApp");
        mSocket.off("setLedState");
        mSocket.off("notificacion");
        mSocket.disconnect();

    }

    private Emitter.Listener onNuevaNotificacion = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            emitirNotifiacion();
        }
    };

    private void emitirNotifiacion() {
        //NOTIFICACIONES
        Bitmap icon = BitmapFactory.decodeResource(getResources(),
                R.mipmap.ic_launcher);

        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(this)
                        .setSmallIcon(android.R.drawable.ic_dialog_alert)
                        .setContentTitle("Temperatura excedida")
                        .setLargeIcon(icon);

        SharedPreferences preference = PreferenceManager.getDefaultSharedPreferences(this);
        String strRingtonePreference = preference.getString("notifications_new_message_ringtone", "DEFAULT_SOUND");
        mBuilder.setSound(Uri.parse(strRingtonePreference));
        mBuilder.setOnlyAlertOnce(true);
        mBuilder.setAutoCancel(true);
        int mNotificationId = 001;
        // Gets an instance of the NotificationManager service
        NotificationManager mNotifyMgr =
                (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        //Builds the notification and issues it.

        mNotifyMgr.notify(mNotificationId, mBuilder.build());
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        this.finish();
    }
}
