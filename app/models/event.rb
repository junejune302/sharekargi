class Event < ActiveRecord::Base
     # scope :between, lambda {|start_time, end_time| {:conditions => ["? < starts_at and starts_at < ?", Event.format_date(start_time), Event.format_date(end_time)] }}
   
  belongs_to :user 
  
  def self.between(start_time, end_time)
    where('start_time > :lo and start_time < :up',
      :lo => Event.format_date(start_time),
      :up => Event.format_date(end_time)
    )
  end

  def self.format_date(date_time)
   Time.at(date_time.to_i).to_formatted_s(:db)
  end

  def as_json(options = {})
    {
      :id => self.id,
      :title => self.title,
      :start => self.start_time,
      :end => self.end_time,
      :description => self.description,
      :allDay => self.is_all_day,
      :user_name => self.user_name,
      :url => Rails.application.routes.url_helpers.events_path(id),
      :color => "green"
    }
  end
  
  private

    def finish_cannot_be_earlier_than_start
      unless start.nil? || finish.nil?
        time_error if finish < start
      end
    end
end

