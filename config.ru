require 'rejex'
use Rack::Static, :urls => ["/javascripts"]
run Sinatra::Application