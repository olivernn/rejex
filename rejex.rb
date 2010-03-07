require 'rubygems'
require 'sinatra'
require 'haml'

set :haml, { :format => :html5 }

get '/' do
  haml :index
end

get '/main.css' do
  sass :main
end