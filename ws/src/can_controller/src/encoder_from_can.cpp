#include <cstdio>
#include <chrono>
#include <functional>
#include <memory>
#include <string>
#include <tuple>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

// TODO: Install the following libraries:
#include "ctre/Phoenix.h"
#include "ctre/phoenix/platform/Platform.h"
#include "ctre/phoenix/unmanaged/Unmanaged.h"
#include "ctre/phoenix/cci/Unmanaged_CCI.h"

using namespace std::chrono_literals;
using namespace ctre::phoenix;
using namespace ctre::phoenix::platform;
using namespace ctre::phoenix::motorcontrol;
using namespace ctre::phoenix::motorcontrol::can;

// TODO: Update these port numbers!
TalonSRX talLeft(1);
TalonSRX talRght(0);

talLeft.ConfigSelectedFeedbackSensor(...); // TODO: finish filling out, though it may be unnecessary.

int kPIDLoopIdx = 0;
int kTimeoutMs = 30;

talLeft.Config_kF(kPIDLoopIdx, 0, kTimeoutMs); // TODO: Figure out PIDF values.
talLeft.Config_kP(kPIDLoopIdx, 0, kTimeoutMs); // TODO: this might have to be moved to main, alongside the ConfigSelectedFeedbackSensor()
talLeft.Config_kI(kPIDLoopIdx, 0, kTimeoutMs);
talLeft.Config_kD(kPIDLoopIdx, 0, kTimeoutMs);

// TODO: we will need to tune the velocity PIDF values according to https://phoenix-documentation.readthedocs.io/en/latest/ch16_ClosedLoop.html, probably.

void initDrive()
{
	talRght.SetInverted(false); /* both talons should blink green when driving forward */
}

void drive(double left, double right)
{
	talLeft.Set(ControlMode::Velocity, left); // TODO: Update controlmode to be accurate
	talRght.Set(ControlMode::Velocity, right);
}

class PathfinderSubscriber : public rclcpp::Node
{
  public:
    PathfinderSubscriber()
    : Node("pathfinder_subscriber") // TODO: Replace node name
    {
      subscription_ = this->create_subscription<tuple>("PLACEHOLDER_VELOCITY_TOPIC", 10, std::bind(&PathfinderSubscriber::topic_callback, this, _1));
    }
  //TODO: WARNING—CURRENTLY, THIS AUTOMATICALLY RUNS THE MOTORS WHENEVER THIS NODE IS RUNNING... JUST FYI.
  private:
    void topic_callback(const tuple::SharedPtr msg) const
    {
      double left_vel = get<0>msg;
      double right_vel = get<1>msg;
      drive(left_vel, right_vel);
    }
    rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscription_;
};

int main(int argc, char ** argv) //TODO: Change node name, probably!
{
  std::string interface = "can0";
  ctre::phoenix::platform::can::SetCANInterface(interface.c_str()); 
  initDrive();
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalSubscriber>());
  rclcpp::shutdown();
  return 0;
}
