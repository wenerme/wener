---
title: Asterisk PJSIP
tags:
  - Asterisk
  - PJSIP
  - SIP
---

# PJSIP

## Tips

- [pjsip.org](http://www.pjsip.org/)
  - [PJSIP Datasheet](https://trac.pjsip.org/repos/wiki/PJSIP-Datasheet)

res_pjproject.so
res_pjsip.so
res_pjsip_acl.so
res_pjsip_authenticator_digest.so
res_pjsip_caller_id.so
res_pjsip_config_wizard.so
res_pjsip_dialog_info_body_generator.so
res_pjsip_diversion.so
res_pjsip_dlg_options.so
res_pjsip_dtmf_info.so
res_pjsip_empty_info.so
res_pjsip_endpoint_identifier_anonymous.so
res_pjsip_endpoint_identifier_ip.so
res_pjsip_endpoint_identifier_user.so
res_pjsip_exten_state.so
res_pjsip_header_funcs.so
res_pjsip_history.so
res_pjsip_logger.so
res_pjsip_messaging.so
res_pjsip_multihomed.so
res_pjsip_mwi.so
res_pjsip_mwi_body_generator.so
res_pjsip_nat.so
res_pjsip_notify.so
res_pjsip_one_touch_record_info.so
res_pjsip_outbound_authenticator_digest.so
res_pjsip_outbound_publish.so
res_pjsip_outbound_registration.so
res_pjsip_path.so
res_pjsip_phoneprov_provider.so
res_pjsip_pidf_body_generator.so
res_pjsip_pidf_digium_body_supplement.so
res_pjsip_pidf_eyebeam_body_supplement.so
res_pjsip_publish_asterisk.so
res_pjsip_pubsub.so
res_pjsip_refer.so
res_pjsip_registrar.so
res_pjsip_registrar_expire.so
res_pjsip_rfc3326.so
res_pjsip_sdp_rtp.so
res_pjsip_send_to_voicemail.so
res_pjsip_session.so
res_pjsip_sips_contact.so
res_pjsip_t38.so
res_pjsip_transport_management.so
res_pjsip_transport_websocket.so
res_pjsip_xpidf_body_generator.so

https://wiki.asterisk.org/wiki/display/AST/Configuring+res_pjsip

https://wiki.asterisk.org/wiki/display/AST/Exchanging+Device+and+Mailbox+State+Using+PJSIP
交换设备和邮箱状态
res_pjsip_publish_asterisk
The res_pjsip_publish_asterisk module establishes an optionally bidirectional or unidirectional relationship between Asterisk instances.

res_pjsip.so: Core of PJSIP code in Asterisk.
res_pjsip_pubsub.so: The code that implements SUBSCRIBE/NOTIFY logic, on which individual event handlers are built.
res_pjsip_exten_state.so: Handles the "presence" and "dialog" events.
res_pjsip_pidf_body_generator.so: This module generates application/pidf+xml message bodies. Required for most subscriptions to the "presence" event.
res_pjsip_xpidf_body_generator.so: This module generates application/xpidf+xml message bodies. Required for some subscriptions to the "presence" event.
res_pjsip_dialog_info_body_generator.so: Required for subscriptions to the "dialog" event. This module generates application/dialog-info message bodies.
