module Travis
  module Build
    class Script
      class NodeJs < Script
        DEFAULT_VERSION = '0.10'

        def export
          super
          if node_js_given_in_config?
            sh.export 'TRAVIS_NODE_VERSION', version, echo: false
          end
        end

        def setup
          super
          convert_legacy_nodejs_config
          nvm_install
          npm_disable_spinner
          npm_disable_strict_ssl unless npm_strict_ssl?
          setup_npm_cache if use_npm_cache?
        end

        def announce
          super
          sh.cmd 'node --version'
          sh.cmd 'npm --version'
          sh.cmd 'nvm --version'
        end

        def install
          sh.if '-f package.json' do
            sh.cmd "npm install #{config[:npm_args]}", retry: true, fold: 'install'
          end
        end

        def script
          sh.if '-f package.json' do
            sh.cmd 'npm test'
          end
          sh.else do
            sh.cmd 'make test'
          end
        end

        def cache_slug
          super << '--node-' << version
        end

        private

          def convert_legacy_nodejs_config
            # TODO deprecate :nodejs
            # some old projects use language: nodejs. MK.
            if config[:nodejs] && !config[:node_js]
              config[:node_js] = config[:nodejs]
            end
          end

          def node_js_given_in_config?
            !!config[:node_js]
          end

          def version
            @version ||= begin
              version = Array(config[:node_js]).first
              version == 0.1 ? '0.10' : version.to_s
            end
          end

          def nvm_install
            if node_js_given_in_config?
              use_nvm_version
            else
              use_nvm_default
            end
          end

          def use_nvm_default
            sh.if '-f .nvmrc' do
              sh.echo "Using nodejs version from .nvmrc", ansi: :yellow
              sh.cmd "nvm install"
              sh.export 'TRAVIS_NODE_VERSION', '$(< .nvmrc)', echo: false
            end
            sh.else do
              sh.cmd "nvm install #{DEFAULT_VERSION}"
              sh.export 'TRAVIS_NODE_VERSION', DEFAULT_VERSION, echo: false
            end
          end

          def use_nvm_version
            sh.cmd "nvm install #{version}"
            sh.export 'TRAVIS_NODE_VERSION', version, echo: false
          end

          def npm_disable_spinner
            sh.cmd 'npm config set spin false', echo: false, timing: false
          end

          def npm_disable_strict_ssl
            # sh.echo '### Disabling strict SSL ###', ansi: :red
            sh.cmd 'echo "### Disabling strict SSL ###"'
            sh.cmd 'npm conf set strict-ssl false', echo: true
          end

          def npm_strict_ssl?
            !node_0_6?
          end

          def node_0_6?
            (config[:node_js] || '').to_s.split('.')[0..1] == %w(0 6)
          end

          def use_npm_cache?
            Array(config[:cache]).include?('npm')
          end

          def setup_npm_cache
            if data.hosts && data.hosts[:npm_cache]
              sh.cmd 'npm config set registry http://registry.npmjs.org/', timing: false
              sh.cmd "npm config set proxy #{data.hosts[:npm_cache]}", timing: false
            end
          end
      end
    end
  end
end
