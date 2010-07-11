require 'fileutils'
require 'yaml'

require 'rubygems'
require 'closure-compiler'
require 'sprockets'
require 'grit'

class Bundle
  include Grit

  REPO_PATH = "/Users/olivernightingale/code/rejex"
  DIST_DIR = 'javascripts/dist'
  SRC_DIR = 'javascripts/src'

  attr_reader :path, :repo

  def initialize
    @repo = Repo.new(REPO_PATH)
    @path = "#{SRC_DIR}/rejex.js"
  end

  def bundle!
    FileUtils.mkdir_p(DIST_DIR)

    write_version

    secretary = Sprockets::Secretary.new(
      :load_path => SRC_DIR,
      :source_files => path
    )
    concatenation = secretary.concatenation
    concatenation.save_to(bundle_path)
  end

  def bundle_path
    "#{DIST_DIR}/rejex.js"
  end

  def minify!
    file = File.open(bundle_path, 'r')
    minified = Closure::Compiler.new.compile(file)

    File.open(minify_path, 'w') do |f|
      f.write(extract_head(file))
      f.write(minified)
    end
  end

  def minify_path
    "#{DIST_DIR}/rejex.min.js"
  end

  def version
    @version ||= repo.commits.first.id
  end

  def write_version
    File.open("#{SRC_DIR}/constants.yml", "w") do |out|
      YAML.dump({'VERSION' => version}, out)
    end
  end

  private
    def extract_head(file)
      head = ''
      file.rewind
      while (line = file.gets)
        if line =~ /^[\/\s]/
          head << line
        else
          break
        end
      end
      head
    end
end
