require 'rubygems'
require 'sinatra'
require 'haml'
require 'erb'
require 'grit'

include Grit

set :haml, { :format => :html5 }

REPO_PATH = Sinatra::Application.root

# caching for one month

get '/' do
  cache_control :public => true, :max_age => 2629743
  haml :index
end

get '/main.css' do
  cache_control :public => true, :max_age => 2629743
  sass :main
end

get '/cache.manifest' do
  cache_control :public => true, :max_age => 2629743
  content_type 'text/cache-manifest'
  @version = Repo.new(REPO_PATH).commits.first
  erb :cache_manifest
end