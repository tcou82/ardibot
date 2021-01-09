/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

'use strict';

/* Gerer affichage notice */

function voirnotice( afficher) {
  if (afficher) {
    document.getElementById('zbtnmu').style.display = 'none';
    document.getElementById('ztxtmu').style.display = 'block';
  } else {
    document.getElementById('zbtnmu').style.display = 'inline';
    document.getElementById('ztxtmu').style.display = 'none';
  }
}

/* globals MediaRecorder */

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
recordButton.addEventListener('click', () => {
  if (recordButton.textContent === "Enregistrer") {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Enregistrer';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
});

const playButton = document.querySelector('button#play');
playButton.addEventListener('click', () => {
  const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

const downloadButton = document.querySelector('button#download');
downloadButton.addEventListener('click', () => {
    //alert('on envoie');
    document.getElementById("nowaitload").style.display = 'none';
    document.getElementById("waitload").style.display = 'block';
    $('#uploaddoc').modal('show');
    var xhr = new XMLHttpRequest();
    var url = "/load"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          afficher('Votre message vidéo a bien été posté');
        }
        if (xhr.readyState === 4 && xhr.status != 200) {
            afficher('Erreur technique : Le serveur n\'est pas disponible ...');
        }
    };
    const blob = new Blob(recordedBlobs, {type: 'video/webm'});
    var formData = new FormData();
    formData.append('name', document.getElementById("name_msg").value);
    formData.append('mail', document.getElementById("mail_msg").value);
    formData.append('video', blob);
    xhr.send(formData);
});

function afficher(msg) {
    document.getElementById("retmsg").innerHTML = msg;
    document.getElementById("nowaitload").style.display = 'block';
    document.getElementById("waitload").style.display = 'none';
}

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function startRecording() {
  recordedBlobs = [];
  let options = {audioBitsPerSecond : 12000,
    videoBitsPerSecond : 120000,
    mimeType: 'video/webm'};
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    alert(`${options.mimeType} is not Supported`);
  }

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = "Arrêter";
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
} 

function stopRecording() {
  mediaRecorder.stop();
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia() got stream:', stream);
  window.stream = stream;

  const gumVideo = document.querySelector('video#gum');
  gumVideo.srcObject = stream;
}

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error('navigator.getUserMedia error:', e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

document.querySelector('button#start').addEventListener('click', async () => {
  const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
  const constraints = {
    audio: {
      echoCancellation: {exact: hasEchoCancellation}
    },
    video: {
      width: 320, height: 240
    }
  };
  console.log('Using media constraints:', constraints);
  await init(constraints);
});
