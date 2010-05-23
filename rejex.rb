require 'rubygems'
require 'sinatra'
require 'haml'

set :haml, { :format => :html5 }

# caching for one week

get '/' do
  cache_control :public => true, :max_age => 604800
  haml :index
end

get '/main.css' do
  cache_control :public => true, :max_age => 604800
  sass :main
end