from django.shortcuts import render
from .creds import CLIENT_ID, CLIENT_SECRET, REDIRECT_URL
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from requests import Request, post

# Create your views here.
class AuthURL(APIView):
  def get(self, request, format=None):
    scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    
    url = Request('GET', 'https//accounts.spotify.com/authorize', params={
      'scope': scopes,
      'response_type': 'code',
      'redirect_uri': REDIRECT_URL,
      'client_id': CLIENT_ID
    }).prepare().url
    
    return Response({'url': url}, status=status.HTTP_200_OK)
  
  

