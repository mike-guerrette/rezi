require 'net/ssh'

def exec(cmd)
	host = ENV['DOCKER_HOST']
		.partition('tcp://')[2]
		.partition(':')[0]
	Net::SSH.start(
		host,
		'docker',
		:password => 'tcuser'
	) do |session|
		puts "Connected to #{host}"
		begin
			session.exec! cmd do |channel, stream, data|
				$stdout << data
				# $stdout << data if stream == :stdout
				# $stderr << data if stream == :stderr
			end
		rescue Interrupt
			session.exec! "killall -SIGINT node"
		end
	end
end

def dc_cmd(cmd)
	exec "cd share/rezi && docker-compose #{cmd}"
end

def db_script(script)
	dc_cmd("run api node api/db/scripts/#{script}")
end

task :run, [:cmd] do |t, args|
	exec "cd share/rezi && #{args.cmd}"
end

task :dc, [:cmd] do |t, args|
	dc_cmd(args.cmd)
end

task :build do
	dc_cmd('build --no-cache')
	dc_cmd('run ui node_modules/.bin/bower install --allow-root')
end

task :createDB do
	db_script('createDB.js')
end

task :start do
	dc_cmd('up')
end

task :setup do
	exec "wget -P /tmp/ http://www.tinycorelinux.net/5.x/x86/tcz/python.tcz && tce-load -i /tmp/python.tcz && rm -f /tmp/python.tcz
			curl -LO -k https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py && sudo /usr/local/bin/python2.7 ez_setup.py && rm -f ez_setup.py"
	exec "sudo /usr/local/bin/easy_install-2.7 pip"
	exec "sudo /usr/local/bin/pip2.7 install -U docker-compose==1.2.0"
	exec "mkdir /home/docker/share"
	exec "sudo mount -t vboxsf -o uid=1000,gid=1000 share /home/docker/share"
end

task :seedDB do
	dc_cmd("run api node api/db/scripts/seed.js")
end