/**
 * util.js
 *
 */

MultiParty_.util = {};

(function(global){
  // オプションのチェック
  MultiParty_.util.checkOpts_ = function(opts_) {
    var opts = {};

    // key check (なかったら throw)
    if(!opts_.key || typeof(opts_.key) !== "string") {
      throw "app key must be specified";
    };

    // key check ( string patter がマッチしなかったら throw )
    if(!opts_.key.match(/^[0-9a-z]{8}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{12}$/)) {
      throw "wrong string pattern of app key";
    };
    opts.key = opts_.key;

    // todo : room prefix にdomainを意識したほげほげ
    // room check (なかったら "")
    if(!opts_.room || typeof(opts_.room) !== "string") {
      var seed = "";
    } else if(!opts_.room.match(/^[0-9a-zA-Z]{4,32}$/)){
      throw "room name should be digit|alphabet and length between 4 and 32";
    } else {
      var seed = opts_.room
    };

    opts.room_name = seed;

    seed += location.host + location.pathname;

    opts.room_id = CybozuLabs.MD5.calc(seed).substring(0,6) + "R_";

    // id check (なかったら生成）
    if(!opts_.id || typeof(opts_.id) !== "string") {
      opts.id = opts.room_id + MultiParty_.util.makeID();
    } else {
      opts.id = opts.room_id + opts_.id;
    }

    // reliable check (なかったら false)
    if(!opts_.reliable) {
      opts.reliable = false;
    } else {
      opts.reliable = true;
    }

    // serialization check (未指定なら binary)
    if(!opts_.serialization) {
      opts.serialization = "binary";
    } else {
      // serializationのタイプをチェックする
      // binary, utf-8, json以外はエラー
      opts.serialization = opts_.serialization;
    }

    // stream check
    opts.video_stream = (opts_.video === undefined ? true : opts_.video);
    opts.audio_stream = (opts_.audio === undefined ? true : opts_.audio);
    opts.use_stream = opts.video_stream && opts.audio_stream;

    return opts;
  }



  // IDを作る
  MultiParty_.util.makeID = function() {
    var id = "";

    for (var i = 0; i < 32; i++) {
      // id += String.fromCharCode( (Math.random() * (125 - 33) + 33) | 0)
      id += String.fromCharCode( (Math.random() * (57 - 48) + 48) | 0)
    }
    return id;
  }

}(window));

