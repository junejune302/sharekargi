class EventsController < ApplicationController
  
  
  # GET /events
  # GET /events.json
  def index
    
    @events = Event.all
    @events = @events.between(params['start'], params['end']) 
    if  (params['start'] && params['end'])
    @events = @events.for_user(params[:user_id]) 
    if params[:user_id].present? && params[:user_id] == current_user.id
    respond_to do |format|
    format.html # index.html.erb
    format.json { render json:  @events.to_json(:include => :user) }
    end
    end
    end
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @events = Event.find(params[:user_id])
    render json: @events
  end
  
  

  # GET /events/new
  def new
    @event = Event.new(params[:user])
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.create(params[:user_id])

    respond_to do |format|
      if @event.save
        format.html { redirect_to user_events_path, alert: "登録完了！！" }
        format.json { render action: 'show', status: :created, location: @event }
      else
        format.html { render action: 'new' }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event = Event.update(params[:user_id])
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event = Event.destroy(params[:user_id])
    
    respond_to do |format|
      format.html { redirect_to events_url }
      format.json { head :no_content }
      @user.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:title, :description, :start_time, :end_time)
    end
end