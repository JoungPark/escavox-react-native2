import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
// import PowerBIEmbed from 'react-native-powerbi';
import PowerBIEmbed from '../components/PowerBIEmbed';
import Constants from 'expo-constants';

export default class PowerBIScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "H4sIAAAAAAAEAB2Wx6rFjLWD3-WfOuDeAhm497Ld7Zl7793hvvs9ZCqkBfpggf77j52-w5wW__z7n6QnD8GqfxnNOwwOeuDQ8PgGwCAoQYv4ZtA9TNtjf4-jVA-Y8LhkePX-cJ6QLx4QnkskSNX4vetdWLSg8yn1KgRLxB7vD4qbocXa1jI_qwZGdRciLZfk-TkDXy6nO4omo7OdJvwlSMgQfU6HRisihOZIz0S_cm83ck29T5iHe9X7-9nAilDXfIzoJwu45-OJHvLKlKmfiJOs_xhdQLjX4RWBl3fqtH4y_pHalfE40xSLaTvUXsmHzulAqUJftp7ntTOCURMWNDaMVN7ERnjXKzS1gjWgCbxvafWC2U1piZ1SaX3EXWfFthFsN8a6JtRx4-M2W0G9TZZdH8H5zI1FVj7SaxLjwAsl97Lcb9ohCrgD0rOCbYnpVsQUx9EsB9aMTAUTmn5thG-XVDIqaOoejSDwoW8TI5_Lwi1ev-iagZB8pFCNKzzoKAd0ZyXxjHxsghlae1-TWlOiLwoNJQitzKxZ5Ccr-bYE0uyQocEROqxKQPKbs1ebP3envqYe0oNjZrqNLehW3nn0EFd0pugrwlUd-r73MuqKjaI4Yt_FrG-kohSnmeqsDT8EnNDrwtRNWxVtKkcx7SqqVy-0O9gpLooiule3qicFH8e6P5WoE_DdWhhXJd4tVsUhykQ2dhp71rsGUQsCodVa3Kg5aazgG8InzfbYZwMPnnJq1dMya2A4MBeU5_ezgdm4SY6T8eSuO0-UgAP4WaZJd3q-nigEkgAf3Z4Hqp2V91-MuYaYJZFqkhhe2Cwy6Pn0MmPfYr0XKr8BSY0Zm8ieQ9xhQHlrqNF3PHQfWEEKyT4BcKtFOSj_jVEmD5J1aYedub1WD-YUZEEedQ1IRVPGiaNKrdotMAw8JWvxpf7utP7F8wHk3cVyX5tMZ_DpcKiIy0lL9G_8FkVeuGqbESpNdwS9LdAswjIDQAah1T-ZljuyKFhZpMHXHNHGE6CDaRxf1KUsf5KLmXqwpMCXEkzdAhUX8w4EwLbURl_4g1_hA_SO6TLyputAqYGIyZE5L2ArG9Koye7oXZkMXaOTOj4r02nmvmCU-f1yKu5GXnVQrBlcIARjxoHd4f5r8loRT716FLLoddqH-K5G7fUuu_Cmr62utBwsHuD-hv9YZin0xrw752j7PvuccyI4arSsXT7eC_p1Nf8pC1-oZsJqmUCnqO5bNmMZ8xsohQPHDbY668VUWebRp_Ywa1ppmwAfBwnehk5R9doWIskEHX7jGk1jJPeXOaQ0z5I-ude2smRChvr9xe4hiClsXsCfX0_iNm54UwpTKIzwK8EEAMwBBPeA9H4FBME_gthn2cVS6SCiDmBcBDsTT8H0c_KxyrHlABE8-iKJZgqmJbQzxjwaFOukRXpi8VsgDTc_glC9KeOb7HoReCXGbf2SHCrzAMsUzDIDzlOVJrDQwI-wClbiD9gndH2S3bnDNr3cutZoD3m0tAI7_kKw4a26Tqr3NxxLDnlgWwPoGXJXKyV0IlLpXiiSFMoAtAkHwglJPdescVRpzOmGtKhcAJsf0AWxHqhFbxP6qopxi9gAULl9iIDoeyd8FJuT42Z8H_ydJbQS--krsqD4EwlN88TznF9Ilcfmj7jUv9_KWK3xns3HP_T8Q3SkF52m_M7xUPrgZdSKXPl-iExJKtrzU3x3gTsE_t7ojPvQrbjGzLuWAq9GfDLdqbFa59IzhCLVoWsF-Bg3UYmQfE6SQQ8xVZxht2oEnQgBXEkZq9lLSgRoZifdrY3hNksovQaWPYbFybGR_VTu5mXj1e1WP0_QepjGIB2IUuJF6d6bZA4csz3wCFk-vmL6tGAaaPaRnw6ZFXmR-mWGOW9ZRjCG5_8YkYvyMJOHH55w9tbjuMmJFqMeyNHKbYN0n0G-_Yp_GIYz-AGLlbUWNaumRcjmKm7z3J40zly-J31IcHMw4pxPgIfvVlpglB_Bi90E0QoNJ9AVwqvGmaIJccTCWHRm3-RY0HrENxXUZPWKYEHa-4-iUFA0f3If-iuAfqOOYsWL9J3hHfvuy2p07KyV2cupUgIPJsHlqq42rpc1jbQptWE1NHZJyJiG2_g5tqisOfwiPGywq_t6KOQUSps942L8IbAme2NFBR_zn3_-9Q-3vcsxa-X7Nx2icsVdKP0xn5msrHqL7KkKKcumIrb6NjY9DQoP5mDOxDx-t4HHEkXLCsG8n44CKgnSkhLkJmzvHfj6KBlQ0XONcpZ1nHwVxHbBMX6FCPQJEi2pPWuHmxawvDo4wPCS3qYEMDOMTGF1-_OSSX3twcURd1_BrUqQh2jGFrPmeTh5Zohiwy9G8T924Z7Xo2Ocy6URFDl6-5UCrQowWQcKUF-pyE9qMot5WFaswL7WAFDWs3E1SpRJ_TmOKD0rZdCuNXaXT3tU8syPuFLfPr6npzGvxkstmcTxaZAM5EVxz7U4-JXMBDtX6t6CklXM8mPQCi8xWDwTLR3i_MDN9hJpg0evf__5H-Z3acq_hn-UR7eY0mYAtLqhD_Ki4pEdPeZ_Lretp_Q4t_LPxo-dc_0IeUIiAh1ldRB6ekBPp2o1EXnRbhyFINO8uPMFcXT9F4QEW0F1CiuA-UZAdZzdvBwJQ5iy-m_EabdJGighYoBxVL-WLtcmtUfNssJBmM5FJNi8PCfc6qYyOQ-hEaJKWmaYHY7xnC8XjOnt4WNVy-cTsOfO2tEeCgY5TFAJ1oo87Y47AdWMwewxFF3SyvwrK_vTfZxJaxyXioWLYn4SZDEW_bNo9dSESawk37EK5iR8kdv9ckMf_rGkl8b_RMpO4CxrSgx6XDcKJdEIQFFBw_Uk3S0X9EVF1JA0M4sP_Hbb-iKWAW6LQ1jAdrEt_bMFyb1LEJ5jg1K9_x66bNL6D_P__T9BFjy3LgsAAA==",
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d",
      id: "f6bfd646-b718-44dc-a378-b73e6b528204",
      pageName: "ReportSectioneb8c865100f8508cc533",
    }
  }

  render() {
    const config = {
      type: 'report',
      tokenType: 1,
      accessToken: this.state.accessToken,
      embedUrl: this.state.embedUrl,
      id: this.state.id,
      pageName: this.state.pageName,
    }

    return (
      <View style={styles.container}>
        <PowerBIEmbed embedConfiguration={config} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
