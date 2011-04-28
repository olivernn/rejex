require 'rubygems'
require 'sinatra'
require 'haml'
require 'erb'
require 'grit'

include Grit

set :haml, { :format => :html5 }

# caching for one month

get '/' do
  # cache_control :public => true, :max_age => 2629743
  haml :index
end

get '/main.css' do
  # cache_control :public => true, :max_age => 2629743
  sass :main
end

get '/cache.manifest' do
  # cache_control :public => true, :max_age => 2629743
  content_type 'text/cache-manifest'
  if Sinatra::Application.environment == :production
    @version = ENV['COMMIT_HASH']
  else
    @version = Repo.new(Sinatra::Application.root).commits.first
  end
  erb :cache_manifest
end