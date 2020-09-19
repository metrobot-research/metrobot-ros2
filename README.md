# metrobot_ros

## Getting Started
#### Install ROS2
  - If running Ubuntu 20.04 this can be easily accomplished by following [this](https://index.ros.org/doc/ros2/Installation/Foxy/Linux-Install-Debians/).
  - If running Ubuntu 18.04 you will need to install from source by following [these instructions](https://index.ros.org/doc/ros2/Installation/Foxy/Linux-Development-Setup/) after completing the steps below.
    - `sudo apt-get install libxaw7-dev libxt-dev`
    - `pip3 install --upgrade pip`
    - `pip3 install lark_parser pyqt5 numpy ifcfg`
    - [Download and unzip this](https://www.riverbankcomputing.com/software/pyqt/download5) then run the following inside the extracted folder
      - `python3 configure.py`
      - `make`
      - `sudo make install`
#### Download the packages
  - cd into the `src` directory of this repository
  - run `vcs import < ../../repos/*.repos` where * is development, main, deps, or deps_release depending on the build you want to do and what code you need. For example if I want to work on the latest development code I would run with * = development and * = deps
#### Install package dependencies
  - cd into the `ws` directory of this repository
  - run `rosdep instal' --from-paths src --ignore-src -r -y`
#### Build packages
  - cd into the `ws` directory of this repository
  - run `colcon build --symlink-install`
#### Verify successful installation and build
  - run `. install/setup.bash` from `ws` and then `ros2 launch metrobot_simulation empty_world.launch.py`
