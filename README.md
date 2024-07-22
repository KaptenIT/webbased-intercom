# What is this?
This is a web based intercom system.

# Goal:
To make an opensource intercom solution for live production. Liveshows, events, streaming, churchservices and conferences.

# What are we thinking?
## a server
That handles all the audio back and forth. The idea is to be able to set up multiple voice channels on the server. The clients can then connect to one or several channels at the same time. So if you want one channel for videoproduction and one for stagehands you can have both. If the videoproducer wants to talk to stagehands he or she can easily jump into that channel to speak and/or listen on the same time as he is connected to the first channel.
The server and its administration is web based.

## the clients
A connected client is always having a full duplex connection to the server as a user. In the client, mainly webbased, you can choose to connect to a channel and then choose wether to just listen or be able to speak aswell. You can be connected to as many channels as you like at the same time and talk/listen.

## Future ideas:
Call buttons to specific channels or clients/users
Hardware based clients like a RPI or Arduino with a touchscreen and lamps.
Lamps for notifications on calling
Maybe one day integrate network based tally lights.


# Set-up

## installation

Download and install this on a webserver running PHP. Like Ngnix/Apache... currently no SQL och other services needed.

## clients

Clients are connecting via webbrowser to devices so you visit your webserver via http://LOCAL-IP-Here
